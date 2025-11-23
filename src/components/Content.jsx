import Home from "./Home.jsx"

export default function Content() {
    return (
        <div 
        className="page-container"
        style={{
            display: "flex",
            flex: 16,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Home />
        </div>
    )
}