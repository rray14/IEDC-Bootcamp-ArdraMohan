
// ● Add expense and earnings
// ● Delete expense and earnings
// ● List all expense and earnings
// ● Total balance



const budgetController = (function(){

    var expenses = function(id,description,value){
        this.id = id;
        this.description=description;
        this.value=value;
    };
    var income = function(id,description,value){
        this.id = id;
        this.description=description;
        this.value=value;
    };
    var calcTot = function(type){
        var sum ;
        if(type==="+"){
            sum = 0;
            data.inc.forEach(function(cur){
                sum = sum+cur.value;
            });
            data.inc_tot=sum;
        }
        else if(type==='-'){
            sum = 0;
            data.exp.forEach(function(cur){
                sum = sum+cur.value;
            });
            data.exp_tot=sum;
        }
    };

    var data = {
            exp: [],
            inc: [],
            exp_tot: 0,
            inc_tot: 0,
            budget: 0,
    };
    return{
        addItem: function(type,desc,val){
            var newItem,ID;
            
            if(type ==="-"){
                if(data.exp.length > 0){
                    ID = data.exp[data.exp.length - 1].id + 1;
                }else{
                    ID=0;
                }
                newItem = new expenses(ID,desc,val);
                data.exp.push(newItem);
                
            }else if(type==="+"){
                if(data.inc.length > 0){
                    ID = data.inc[data.inc.length - 1].id + 1;
                }else{
                    ID=0;
                }
                newItem = new income(ID,desc,val);
                data.inc.push(newItem);
                //console.log(newItem);
                
            }
            return newItem; 
        },

        // deleteItem: function(type,id){
        //     var ids,index,eff;
        //     eff=type;
        //     console.log(eff);
           
        //         ids = data.inc.map(function(current) {
        //             return current.id;
        //         });
        //         index = ids.indexOf(id);
        //         if(index !== -1){
        //             data.inc.splice(index,1);
        //         }  
        // },
        deleteItem: function(type, id) {
            var ids, index,eff;
            eff=type;
            if(eff==='inc'){
                ids = data.inc.map(function(current) {
                    return current.id;
                });
    
                index = ids.indexOf(id);
    
                if (index !== -1) {
                    data.inc.splice(index, 1);
                }
            }
            if(eff==='exp'){
                ids = data.exp.map(function(current) {
                    return current.id;
                });
    
                index = ids.indexOf(id);
    
                if (index !== -1) {
                    data.exp.splice(index, 1);
                }
            }
            
            
        },

        calcBudget : function(){
            calcTot('+');
            calcTot('-');
            data.budget = data.inc_tot - data.exp_tot;
        },
        getBudget:function(){
            return{
                totBud : data.budget,
                totInc : data.inc_tot,
                totExp : data.exp_tot
                
            }
        }
    }
    
})();



const UIController =(function(){
    
    return{
        getinput: function(){
            return{
                type: document.querySelector('.add__type').value,
                description: document.querySelector('.add__description').value,
                value: parseFloat(document.querySelector('.add__value').value)
            };
            
        },
        getinput2: function(){
            return{
                type: document.querySelector('.exp__type').value,
                description: document.querySelector('.exp__description').value,
                value: parseFloat(document.querySelector('.exp__value').value)
            };
            
        },

        addListInput: function(obj,type){
            var html;
            if(type==="+"){
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                newHtml = html.replace('%id%',obj.id);
                newHtml = newHtml.replace('%description%',obj.description);
                newHtml = newHtml.replace('%value%',obj.value);

                document.querySelector('.inc-list').insertAdjacentHTML('beforeend',newHtml);

            }else if(type=="-"){
                html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__delete"><button class="item__delete--btn2"><i class="icofont-close-circled"></i></button></div></div></div>'
                newHtml = html.replace('%id%',obj.id);
                newHtml = newHtml.replace('%description%',obj.description);
                newHtml = newHtml.replace('%value%',obj.value);

                document.querySelector('.exp-list').insertAdjacentHTML('beforeend',newHtml);
            }
           
        }, 
        
        deleteListItem: function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clear: function(type){
            var fields;
            if(type==="+"){
                fields = document.querySelectorAll('.add__description'+','+'.add__value');
            }else if(type==="-"){
                fields = document.querySelectorAll('.exp__description'+','+'.exp__value');
            }

            fieldArr = Array.prototype.slice.call(fields);
            fieldArr.forEach(function(current,index,array){
                current.value="";
            });
            fieldArr[0].focus();
        },

        displayBudget: function(obj){
            // document.querySelector('.budget__value').textContent = obj.totBud;//DOMstrings.budgetLabel
            // document.querySelector('.totExp_value').textContent = obj.totExp;//DOMstrings.incomeLabel
            // document.querySelector('.totInc_value').textContent = obj.totInc;//DOMstrings.expensesLabel
            document.querySelector(".budget_value").innerHTML = obj.totBud;
            document.querySelector(".totExp_value").innerHTML = obj.totExp;
            document.querySelector(".totInc_value").innerHTML = obj.totInc;
 
        }
    };
})();


const appController = (function(budCtrl,uiCtrl){
    
    var setsEventListener = function(){
        document.querySelector('.add__btn').addEventListener('click',ctrlAddInput);
        document.querySelector('.add__btn2').addEventListener('click',ctrlAddInput2);
        
        document.addEventListener('keypress',function(event){
            if(event.keyCode === 13){
                ctrlAddInput();
            }
        });
        document.querySelector('.container').addEventListener('click',ctrlDelInput);
        
        
    };

    var updateBudget = function(){
        budCtrl.calcBudget();
        var budget = budCtrl.getBudget();
        console.log(budget);
        uiCtrl.displayBudget(budget);
    };

    var ctrlAddInput = function(){
        var inp,newItem;
        inp = uiCtrl.getinput();
        console.log(inp);
        if(inp.description=="" || isNaN(inp.value)){
            alert("Please enter valid description or amount");
            uiCtrl.clear(inp.type);
        }else{
            newItem = budCtrl.addItem(inp.type,inp.description,inp.value);
            uiCtrl.addListInput(newItem,inp.type);
            uiCtrl.clear(inp.type);
            updateBudget();
        }
        
        
    };
    var ctrlAddInput2 = function(){
        var inp,newItem;
        inp = uiCtrl.getinput2();
        console.log(inp);
        if(inp.description=="" || isNaN(inp.value)){
            alert("Please enter valid description or amount");
            uiCtrl.clear(inp.type);
        }else{
            newItem = budCtrl.addItem(inp.type,inp.description,inp.value);
        uiCtrl.addListInput(newItem,inp.type);
        uiCtrl.clear(inp.type);
        updateBudget();
        }
        
    };

    var ctrlDelInput = function(event){
        //console.log(event.target);
        var itemID,splitID,type,ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            budCtrl.deleteItem(type,ID);
            uiCtrl.deleteListItem(itemID);
            console.log(itemID);
            updateBudget();
        }
    };
    
    return {
        init: function() {
            console.log('Application has started.');
            uiCtrl.displayBudget({
                totBud : 0,
                totInc : 0,
                totExp : 0
            });
            setsEventListener();
        }
    };

})(budgetController,UIController);

appController.init();