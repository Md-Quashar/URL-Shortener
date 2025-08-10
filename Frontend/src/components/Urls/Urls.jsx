import React from 'react'
import './urls.css'
import axios from 'axios';
import { useContext } from 'react';
import { UrlContext } from '../../UrlContext/UrlContext';
const API=import.meta.env.VITE_LOCAL_API
function Urls({data}) {
  //  console.log(API);
  if (!data || data.length === 0) {
    return <div className="no-urls">No Short URLs available</div>;
  }
  const {setUrls,} = useContext(UrlContext);
  return (
      <div className="url-table-container">
      <table className="url-table">
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
            <th>Delete</th>
          </tr>
        </thead>
      </table>
      
      <div className="table-body-container">
        <table className="url-table">
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td >
                  <a href={item.full_url} target="_blank" rel="noopener noreferrer">
                    {item.full_url}
                  </a>
                </td>
                <td>
                  <a 
                    href={`${API}${item.short_url}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {`${API}${item.short_url}`} 
                  </a>
                </td>
                <td className='clicks'>{item.clicks}</td>
                <td>
                    <button 
                    className='button-42' 
                    onClick={async () => {
                      const URL= API+ 'user/' + item._id;
                      const response =await axios.delete(URL)
                     // console.log("Delete Response:", response.data);
                      setUrls(response.data.shortUrls);
                      
                    }}
                  >
                    Delete
                  </button>
                </td>                  
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default Urls