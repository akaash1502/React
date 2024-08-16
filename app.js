


// root.render(heading); 

//nested structure bnaana react mein

/*
<div class="parent">
    <div class="child">
        <h1></h1>
    </div>
</div>
 
*/

const parent = React.createElement(
    "div",
    {id:"parent"},
    React.createElement(
        "div", 
        {id:"child"},
        [
        React.createElement("h1",{},"I am H1 tag"),
        React.createElement("h2",{},"I am H2 tag"),
        ]
    )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);


// const heading = React.createElement("h1",{},"Hello World from React!");

// const root = ReactDOM.createRoot(document.getElementById("root"));
// ye DOM se create hoga