import loading from '../../assets/loading.gif'
export default function Loading() {
    return (
      <div className="preloader bg-soft flex-column justify-content-center align-items-center">
        <img style={{marginLeft: "45vw", marginTop: "45vh"}} width="50px" height="auto" src={loading} alt="loading" />
      </div>
    )
}
