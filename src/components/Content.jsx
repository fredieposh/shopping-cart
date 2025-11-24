
export default function Content({ children }) {
    return (
        <div 
        className="page-container"
        style={{
            display: "flex",
            flex: 16,
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: "center",
            overflowY: "scroll",
        }}>
            {children}
        </div>
    )
}