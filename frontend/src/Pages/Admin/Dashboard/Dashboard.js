import StaticCards from "./StaticCards";
import Charts from "./Charts";

function Dashboard(){
  return(
    <>
      <div className="w-auto shadow rounded-pill mb-3 py-2 px-3 mx-2" style={{background: '#ffff'}}>
        <div className="d-flex align-items-center">
          <p className="h4 mb-0 text-spdark">The statistics</p>
        </div>
      </div>
      <StaticCards/>
      <Charts/>
    </>
  )
}

export default Dashboard;