import React from "react"

function Expense(){
    return(
        <div class="expenses">
                        <h2>Expenses</h2>
                        <div class="totExp_value">- 24000</div><br/>
                        <div class="add">
                            <input type="text" class="exp__type" value="-" style={{"width":"10px"}}/>
                            <input type="text" class="exp__description" placeholder="Add description"/>
                            <input type="number" class="exp__value" name="amt" placeholder="Add amount"/>
                            <button class="add__btn2"><i class="icofont-check-circled"></i></button>
                        </div>
                        <div class="exp-list">
                            {/* <!-- <div class="item clearfix" id="exp-0">
                                <div class="item__description">Apartment rent</div>
                                <div class="right clearfix">
                                    <div class="item__value">- 900.00</div>
                                    
                                    <div class="item__delete">
                                        <button class="item__delete--btn2"><i class="icofont-close-circled"></i></button>
                                        
                                    </div>
                                </div>
                            </div> --> */}
                        </div>
                        
        </div>
    );
}

export default Expense;