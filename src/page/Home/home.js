import React from 'react';

import './home.scss';
// import axios from '../../shares/axios-ecomm';

// import Spinner from '../../components/UI/spinner/spinner';
import Layout from '../../components/Layout/Layout';

import useAuth from '../../store/hooks/auth';

const Home = () => {
  const { reqSignin } = useAuth();

  const signinHandle = () => {
    const user = {
      email: 'sample@mail.com',
      password: 'sample123'
    }

    reqSignin(user);
  }

  return (
    <Layout 
      title="Home Page"
      description="MERN Stack - Ecommerce" >
      <button onClick={signinHandle}>Signin</button>
      ...
    </Layout>
  );
}


export default Home;



// const [news, setNews] = useState([]);
// const [searchQuery, setSearchQuery] = useState('react');
// const [url, setUrl] = useState(`http://hn.algolia.com/api/v1/search?query=node`);
// const [loading, setLoading] = useState(false);

// useEffect(() => {
//   const fetchNews = () => {
//     setLoading(true);
//     axios.get(url)
//       .then(result => result.data)
//       .then(data => {
//         setNews(data.hits);
//         setLoading(false);
//       })
//       .catch(error => console.log(error));
//   };
  
//   fetchNews();
// }, [url])

// const handleChange = e => {
//   setSearchQuery(e.target.value);
// }

// const handleSubmit = e => {
//   e.preventDefault();
//   setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
// }

// return(
//   <div>
//     <h1>This is News</h1>
//     {loading ? (<Spinner />) : null}

//     <form onSubmit={handleSubmit}>
//       <input 
//         value={searchQuery}
//         onChange={handleChange}
//         type="text"/>

//         <button>Search</button>
//     </form>

//     {news.map((n, i) => (<p key={i}>{n.title}</p>))}
//   </div>
// )

// }