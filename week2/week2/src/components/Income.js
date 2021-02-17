import React from "react"

function Income(){
    return(
        <div class="income">
                        <h2>Earnings</h2>
                        <div class="totInc_value">+ 24000</div><br/>
                        <div class='add'>
                            <input type="text" class="add__type" value="+" style={{"width":"10px"}}/>
                            <input type="text" class="add__description" placeholder="Add description"/>
                            <input type="number" class="add__value" name="amt" placeholder="Add amount"/>
                            <button class="add__btn"><i class="ion-ios-checkmark-outline"></i></button>
                        </div>
                        <div class="inc-list">
                            {/* <!--<div class="item clearfix" id="inc-0">
                                <div class="item__description">Salary</div>
                                <div class="right clearfix">
                                    <div class="item__value">+ 2,100.00</div>
                                    <div class="item__delete">
                                        <button class="item__delete--btn">
                                            <i class="ion-ios-close-outline"></i>
                                        </button>
                                    </div>
                                </div>
                            </div> --> */}
                        </div>
        </div>
    );
}

export default Income;