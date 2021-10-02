// axios Globals
axios.defaults.headers.common['X-Auth-Token']= 'newtoken'
// GET REQUEST
//url 'https://jsonplaceholder.typicode.com/todos'
function getTodos() {
    // one mathod of get
    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos'
    //     //for limit the data

    //     // params: {
    //     //     _limit: 5
    //     // }
    // })
    // .then((responce)=> showOutput(responce))
    // .catch((error)=> console.log(error))

    //another mathod of get
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then((responce)=> showOutput(responce))
    .catch((error)=>console.log(error))
  }
  
  // POST REQUEST
  function addTodo() {
    // one mathod of post
    // axios({
    //     method: 'post',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     data: {
    //        title: 'New ToDo',
    //        completed: false
    //     }
    // })
    // .then((responce)=> console.log(responce))
    // .catch((error)=> console.log(error))

    //another mathod of post
    axios.post('https://jsonplaceholder.typicode.com/todos',{
        title: 'new ToDo',
        completed: false
    })
    .then(responce=>showOutput(responce))
    .catch(error=> console.log(error))
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    //Put request
    // axios.put('https://jsonplaceholder.typicode.com/todos/1',{
    //     title: 'new ToDo',
    //     completed: false
    // })
    // .then(responce=>showOutput(responce))
    // .catch(error=> console.log(console.log(error)))

    //Patch request
    axios.patch('https://jsonplaceholder.typicode.com/todos/1',{
        title: 'new ToDo'
    })
    .then(responce=>showOutput(responce))
    .catch(error=> console.log(console.log(error)))
  }
  
  // DELETE REQUEST
  function removeTodo() {
    //delete request (returns empty object)
    axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(responce=>showOutput(responce))
    .catch(error=> console.log(console.log(error)))
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    //get to request 
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos'),
        axios.get('https://jsonplaceholder.typicode.com/users')
    ])
    //one way of showing ooutput
    // .then(responce=>{
    //     console.log(responce[1]);
    //     console.log(responce[1]);
    //     showOutput(responce[1]);
    // })

    //another one the cleaner way of showing output
    .then(axios.spread((todos, users)=>{
        console.log(todos);
        console.log(users);
        showOutput(users)
    }))
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
      const config ={
          headers:{
            'Content-Type' : 'application/json',
            Authorization: 'sometoken'
          }
      }
    axios.post('https://jsonplaceholder.typicode.com/todos',{
        title: 'Custom Header',
        completed: true
    }, config)
    .then((responce)=> showOutput(responce))
    .catch((error)=> console.log(error))
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    const options={
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data:{
            title: 'Hello World'
        },
        transformResponse: axios.defaults.transformResponse.concat((data)=>{
            data.title = data.title.toUpperCase();
            return data;
        })
    }

    axios(options)
    .then(responce=> showOutput(responce))
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios
    .get('https://jsonplaceholder.typicode.com/todoss',{
        validateStatus: function(status){
            return status < 500  //reject only status greater greater or equal to 500
        }
    })
    .then(res=>showOutput(res))
    .catch(err=>{
        //server responded with a status code other than 200 range
        if(err.response){
            console.log(err.response.data + ' this is error');
            console.log(err.response.satus + ' this is error');
            console.log(err.response.headers + ' this is error');
        }
        else if(err.request){
            //request was made but no responce
            console.error(err.request + ' this is error')
        }
        else
        console.error(err.message + ' this is error');
    })
  }
  
  // CANCEL TOKEN
  function cancelToken() {
      const source = axios.CancelToken.source();
    axios
    .get('https://jsonplaceholder.typicode.com/todos',{
        cancelToken: source.token
    })
    .then(res=>showOutput(res))
    .catch((thrown)=>{
        if(axios.isCancel(thrown)){
            console.log('Request Caneled : ' + thrown.message);
        }
    })

    if(true){
        console.log('request canceled');
    }
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  axios.interceptors.request.use(
      config=>{
          console.log(
              `${config.method.toUpperCase()} request send to ${
                  config.url
              } at ${new Date().getTime()}`
          )
          return config;
      },
      error=>{
          return Promise.reject(error);
      }
  )
  
  // AXIOS INSTANCES
//   const axiosInstance = axios.create({
//       baseURL:'https://jsonplaceholder.typicode.com/todos'
//   })
//   axiosInstance.get('/comments').then(res=>showOutput(res))
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);
