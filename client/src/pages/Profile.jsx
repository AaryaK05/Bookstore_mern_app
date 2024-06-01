import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";



export default function Profile() {
    const handleLogout=()=>{
        localStorage.removeItem('isLoggedIn');
    }

    return (
        <>
            <Header />
            Profile
            <button onClick={handleLogout}>Log out</button>
            <Footer />
        </>
    );
}
