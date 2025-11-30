import { useLocation } from "react-router"

export default function Content({ children }) {
    const location = useLocation();
    const overflow = location.pathname === '/shop' ? "scroll" : null;
    return (
        <div 
        className="page-container"
        style={{
            display: "flex",
            flex: 16,
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: "center",
            overflowY: overflow,
            height: '100vh',
        }}>
            {children}
        </div>
    )
}