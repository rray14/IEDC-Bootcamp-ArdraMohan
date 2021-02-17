import React from 'react';
import Income from './Income.js'
import Expense from './Expense.js'
import Hero from './Hero.js'

function Home(){

    

        return(
            <div>
                <Hero />
                <br/>
                <div class="container">
                    <Income />
                    <Expense /> 
                </div>
                <script language="javascript" type="text/javascript" src="script.js"></script>
            </div>   
        );
        
}


export default Home;
// class Home extends React.Component{
//     render(){