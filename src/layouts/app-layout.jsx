import Header from "@/components/header"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div>
      <main className="container min-h-screen">
        <Header/>
        <Outlet/>
      </main>

      <div className="p-10 mt-10 text-center bg-gray-800">
        Made with 💖 by Yashwardhan Tulsyan
      </div>
    </div>
  )
}

export default AppLayout
