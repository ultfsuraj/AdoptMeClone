const Pet = (props)=>{
    return React.createElement(
        "div",
        {},
        [
            React.createElement("h1",{},props.name),
            React.createElement("h2",{},props.animal),
            React.createElement("h2",{},props.breed),
        ]
    )
}

 


const App = ()=>{
        
    return React.createElement(
        "div", // tag name
        {}, // attributes
        [ 
            React.createElement('h1',{},'Adopt me!'), // children
            React.createElement(Pet,{
                animal: "Dog",
                name: "Luna", 
                breed: "Havanese"
            }),
            React.createElement(Pet,{
                animal: "Bird",
                name: "Pepper",
                breed: "Cocktail"
            }),
            React.createElement(Pet,{
                animal: "cat",
                name: "Doink",
                breed: "mixed"
            }),
        ]
    )
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container) // react-dom handles rendering
root.render(React.createElement(App))

