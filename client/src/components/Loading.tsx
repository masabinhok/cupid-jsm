import { loading } from "../assets"


const Loading = () => {
  return (
    <main className="main" style={{
      backgroundImage: `url(${loading})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <p>Loading...</p>
    </main>
  )
}

export default Loading