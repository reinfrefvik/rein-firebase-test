import Header from "../components/header/Header"

const HomePage = () => {
    return (
        <div>
            <Header onLogin={function (username: string, password: string): void {
                throw new Error("Function not implemented.")
            } } />
        </div>
    )
}

export {HomePage};