import SidebarDash from "./sidebar/sidebar";

export default function layout({ children }) {
    return (

        <>
            <section className="flex justify-center">
                <div>
                    <SidebarDash></SidebarDash>
                </div>
                {children}
            </section>;
        </>
    )


}