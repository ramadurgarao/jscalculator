var controlStr = "",
                subStr = "",
                dispArea = null,subStrArea = null;
            function Operation (operand1,operator) {                
                return function (operand2) {
                    var result = "";
                    operand1 = Number(operand1);
                    operand2 = Number(operand2);
                    switch (operator) {
                        case "+":
                            result = operand1+operand2;
                        break;
                        case "-":
                            result = operand1-operand2;
                        break;
                        case "*":
                            result = operand1*operand2;
                        break;
                        case "/":
                            result = operand1/operand2;
                        break;
                    };
                    return result;
                };
            };
            function calculatorOp() {
                var op1,oper,op2;
                this.addOperands = function (operand,operator) {
                    if (op1 && oper) {
                        op1 = Operation(op1,oper)(operand);
                    } else {
                        op1 = operand;
                    }
                    oper = operator;
                    if (operator === "=") {
                        controlStr = op1;
                        subStr = op1;
                        oper = "";
                    } else {
                        controlStr = "";
                        subStr = op1+""+oper;
                    }
                };
                this.reset = function () {
                    op1 = oper = op2 = controlStr = subStr = "";
                }
            };
            function domLoaded () {
                dispArea = document.querySelector("#display-area");
                subStrArea = document.querySelector("#sub-str");
                var calOpObj = new calculatorOp();
                document.querySelectorAll(".ctrl").forEach(function(ele){
                    ele.addEventListener("click",function(event){
                        var type = event.currentTarget.getAttribute("type");
                        if (/^(AC|CE)$/.test(type)) {
                            calOpObj.reset();
                        } else if (/\d/.test(type)){
                            controlStr += type;
                        } else if (type !== "."){
                            if (controlStr) {
                                calOpObj.addOperands(controlStr,type);
                            } else if (type === "-") {
                                controlStr += type; // minus (-) to enter negative numbers 
                            }                            
                        } else {
                            // handling dot (.) symbol
                            if (/^-?\d*.?\d*$/.test(controlStr+type)) {
                                controlStr += type;
                            }
                        }
                        dispArea.setAttribute("value",controlStr);
                        subStrArea.setAttribute("value",subStr);
                    });    
                });
                  
            };