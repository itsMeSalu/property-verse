import React, {useState,useEffect,useRef} from 'react';
import './career.css';

const lifeCards=[
 ['Purpose Driven Work','Make a real difference by helping people find the right property. Every interaction is a step toward building trust and lasting value.'],
 ['Supportive Team Culture','Work with a team that values respect, collaboration, and growth.At Proptimes, you’re never working alone we grow together.'],
 ['Learning Every Day','We believe in continuous learning through real world experiences. Every project is a chance to improve, adapt, and get better.'],
 ['Commitment to Integrity','Transparency and honesty are at the core of what we do. We build relationships that go beyond just closing a deal.'],
];
const jobs=[{"url":"https://proptimes.org/jobs/digital-marketing-executive/","title":"Digital Marketing Executive","specs":["Full Time","Bangalore","1 – 2 Years"]},{"url":"https://proptimes.org/jobs/senior-sales-associatepune/","title":"Senior Sales Associate(Pune)","specs":["Full Time","pune","0 – 2 years"]},{"url":"https://proptimes.org/jobs/senior-sales-associate-2-hyderabad/","title":"Business Development Associate (HYD)","specs":["Full Time","Hyderabad","2 – 3 Years"]},{"url":"https://proptimes.org/jobs/manager-chennai/","title":"Senior Sales Associate (Chennai)","specs":["Full Time","chennai","2 – 3 Years"]},{"url":"https://proptimes.org/jobs/assistant-manager-chennai-2/","title":"Pre Sales Associate (Chennai)","specs":["Full Time","chennai","1 – 2 Years"]},{"url":"https://proptimes.org/jobs/sales-associate-2/","title":"Business Development Associate (BLR)","specs":["Full Time","Bangalore","0 – 2 years"]},{"url":"https://proptimes.org/jobs/sales-associate/","title":"Senior Property Advisor (BLR)","specs":["Full Time","Bangalore","0 – 2 years"]}];
function JobFilter({label,options,value,onChange}){
 const ref=useRef(null);
 useEffect(()=>{const close=e=>{if(!ref.current?.contains(e.target)||e.key==='Escape')ref.current.open=false};document.addEventListener('pointerdown',close);document.addEventListener('keydown',close);return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',close)}},[]);
 return <details className="career-job-filter" ref={ref}><summary>{value||label}</summary><div className="career-job-options">{['',...options].map(v=><button type="button" key={v} className={value===v?'selected':''} onClick={()=>{onChange(v);ref.current.open=false}}>{v||label}</button>)}</div></details>;
}
export default function Career(){
 const [query,setQuery]=useState(''),[term,setTerm]=useState(''),[type,setType]=useState(''),[location,setLocation]=useState('');
 const shownJobs=jobs.filter(j=>(!term||j.title.toLowerCase().includes(term.toLowerCase()))&&(!type||j.specs[0]===type)&&(!location||j.specs[1]===location));
 return <><section className="career-hero home-bleed">
  <div className="career-hero-inner">
   <h1>Become a Part of<br/>Something Extraordinary</h1>
   <p>At Proptimes, we help people find the right properties by making real estate simple, transparent, and valuable. Our mission is to create meaningful experiences and long-term value for every client. When you join us, you become part of a purpose-driven team committed to making a real difference in the property world.</p>
   <a className="orange career-explore" href="#jobopenings">Explore Jobs</a>
  </div>
 </section>
 <section className="career-life"><h2>Life At Proptimes</h2><div className="career-life-grid">{lifeCards.map(([title,text],i)=><article className="career-life-card" key={title}><img src={`/images/career-life-${i+1}.png`} alt={title}/><h3>{title}</h3><p>{text}</p></article>)}</div></section>
 <section className="career-jobs" id="jobopenings">
  <h2>Find Your Next Job at Proptimes</h2>
  <form className="career-job-search" onSubmit={e=>{e.preventDefault();setTerm(query)}}>
   <div className="career-search-input"><input aria-label="Search jobs" placeholder="Search" value={query} onChange={e=>{setQuery(e.target.value);setTerm(e.target.value)}}/><button aria-label="Search jobs" type="submit"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></svg></button></div>
   <JobFilter label="All Job Type" options={['Full Time']} value={type} onChange={setType}/><JobFilter label="All Job Location" options={['Bangalore','chennai','pune','Hyderabad']} value={location} onChange={setLocation}/>
  </form>
  <div className="career-job-list">{shownJobs.map(j=><article className="career-job-row" key={j.url}><h3><a href={j.url}>{j.title}</a></h3><div className="career-job-specs">{j.specs.map((text,i)=><span key={i}>{text}</span>)}</div><a className="career-job-details" href={j.url}>More Details <span aria-hidden="true">→</span></a></article>)}{!shownJobs.length&&<p>No jobs found.</p>}</div>
 </section>
 <section className="career-team home-bleed" aria-label="Our Prop Times team"><img src="/images/career-team.png" alt="The Prop Times team" loading="lazy"/></section></>;
}
