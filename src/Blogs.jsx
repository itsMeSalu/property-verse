import React, {useState} from 'react';
import data from './homeData.json';
import moreBlogs from './blogPosts.json';
import './blogs.css';

const categories=['All','Buying Guide','Investment Guide','Life Style','Market Trends','NRI Guide','Outdoor Space','Project Review','Real Estate'];
export default function Blogs(){
 const [category,setCategory]=useState('All'),[query,setQuery]=useState(''),[search,setSearch]=useState('');
 const blogs=[...data.blogs,...moreBlogs].filter(b=>(category==='All'||category==='Project Review')&&(!search||`${b.title} ${b.excerpt}`.toLowerCase().includes(search.toLowerCase())));
 return <section className="blogs-page">
  <div className="blogs-heading"><h1>Explore Our Latest Blogs</h1><p>Stay Informed and Inspired</p></div>
  <div className="blogs-toolbar"><div className="blogs-categories">{categories.map(c=><button key={c} className={category===c?'active':''} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div><form className="blogs-search" onSubmit={e=>{e.preventDefault();setSearch(query)}}><input placeholder="Search here...." aria-label="Search blogs" value={query} onChange={e=>{setQuery(e.target.value);if(!e.target.value)setSearch('')}}/><button type="submit" aria-label="Search blogs"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="7"/><path d="m15 15 7 7"/></svg></button></form></div>
  <div className="blogs-grid">{blogs.map(blog=><article className="blogs-card" key={blog.url}><a href={blog.url}><img src={blog.image} alt={blog.name}/></a><div className="blogs-card-content"><div className="blogs-meta"><button onClick={()=>setCategory('Project Review')}>Project Review</button><time>{blog.date}</time></div><h2><a href={blog.url}>{blog.title}</a></h2><p>{blog.excerpt}</p></div></article>)}</div>
  {!blogs.length&&<p className="blogs-empty">No posts found.</p>}
 </section>;
}
