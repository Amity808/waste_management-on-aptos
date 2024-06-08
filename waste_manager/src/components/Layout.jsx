
import Navbar from "./Navbar";


const Layout = ({ children }) => {
    return (
        <>
            <div className="bg-gypsum overflow-hidden flex flex-col min-h-screen">
                <Navbar />
                <div className="">
                    {children}
                </div>

            </div>
        </>
    );
};

export default Layout;
