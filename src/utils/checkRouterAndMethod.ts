



const checkRouterAndMethod = (apiData, router, method) => {
  try{
    let paths = apiData.paths
    if(!router||!method){
      return false
    }
    return !!paths[router][method]
  }
  catch(err){
    return false
  }

}


export default checkRouterAndMethod