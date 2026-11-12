import React, { useEffect, useRef, useState } from 'react';
import data from './homeData.json';
import locations from './dropdownOptions.json';
import './homepage.css';

const processes = [
 ['Property Consulting','Our platform offers expert guidance and insights to help you explore properties, ensuring informed decisions and successful property transactions.'],
 ['Site Visit Assistance','We make property exploration easy by arranging and facilitating site visits, ensuring you experience potential homes firsthand.'],
 ['Negotiations','Our experts negotiate on your behalf to secure the best terms and prices, ensuring a smooth and favourable real estate deal.'],
 ['Best Deals','We curate and present the finest real estate opportunities, ensuring you access the best deals tailored to your preferences and budget.'],
 ['Home Loan Assistance','We navigate your home loan journey, connecting you with lenders to secure financing for your dream property.'],
];
function Heading({title,subtitle}){return <div className="home-heading"><h2>{title}</h2><p>{subtitle}</p></div>}
function Arrow(){return <svg viewBox="0 0 24 20" aria-hidden="true"><path d="M1 10h20m-7-7 7 7-7 7"/></svg>}
function SearchIcon(){return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="12" cy="12" r="10.5"/><path d="m20 20 11 11"/></svg>}
function Dots({count,active,onChange,label}){return <div className="home-dots">{Array.from({length:count},(_,i)=><button key={i} type="button" className={i===active?'active':''} aria-label={`${label} ${i+1}`} aria-current={i===active?'true':undefined} onClick={()=>onChange(i)}/>)}</div>}
export default function Homepage({SearchSelect,renderProperty,properties}){
 const [city,setCity]=useState(''),[area,setArea]=useState(''),[keyword,setKeyword]=useState(''),[mobile,setMobile]=useState(()=>window.matchMedia('(max-width:767px)').matches);
 const [banner,setBanner]=useState(0),[builder,setBuilder]=useState(5),[award,setAward]=useState(()=>Math.max(0,data.awards.findIndex(a=>a.title==='NCC Urban'))),[review,setReview]=useState(5);
 const bannerRef=useRef(null),builderRef=useRef(null),awardRef=useRef(null),reviewRef=useRef(null),interacted=useRef({});
 useEffect(()=>{const query=window.matchMedia('(max-width:767px)');const update=()=>setMobile(query.matches);query.addEventListener('change',update);return()=>query.removeEventListener('change',update)},[]);
 useEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const timer=setInterval(()=>{
   if(document.hidden)return;
   if(!bannerRef.current?.matches(':hover')&&!interacted.current.banner)setBanner(i=>(i+1)%data.banners.length);
   if(!awardRef.current?.matches(':hover')&&!interacted.current.award)setAward(i=>(i+1)%data.awards.length);
   if(!reviewRef.current?.matches(':hover')&&!interacted.current.review)setReview(i=>i>=data.reviews.length?i:i+1);
  },5000);return()=>clearInterval(timer);
 },[]);
 const [builderSlide,setBuilderSlide]=useState(0);
 useEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const timer=setInterval(()=>{
   if(!document.hidden&&!builderRef.current?.matches(':hover')&&!builderRef.current?.contains(document.activeElement))setBuilderSlide(i=>i>=data.builders.length?i:i+1);
  },1000);
  return()=>clearInterval(timer);
 },[]);
 const cities=locations.locations.filter(o=>!o.text.startsWith('-'));
 const cityStart=locations.locations.findIndex(o=>o.value===city);
 const nextCity=locations.locations.findIndex((o,i)=>i>cityStart&&!o.text.startsWith('-'));
 const areaOptions=(city?locations.locations.slice(cityStart+1,nextCity<0?locations.locations.length:nextCity):locations.locations).filter(o=>o.text.startsWith('-')).map(o=>({...o,text:o.text.replace(/^-\s*/, '')}));
 function search(e,type=''){
  e?.preventDefault();const params=new URLSearchParams();if(city)params.set('location',city);if(area)params.set('area',area);if(keyword)params.set('keyword',keyword);if(type)params.set('type',type);window.location.assign('/properties-search/'+(params.size?'?'+params:''));
 }
 const featured=[
 ['Prestige Southern Star','home/southern-star','Prestige Southern Star is a 30+ acre township in Bangalore offering luxury living with scenic views of Begur Lake, lush greenery, stunning pools, and premium amenities for a serene, resort-like lifestyle every day.','82 L','1, 2, 3 & 4 BHK Apartment','695 - 2774','Akshaya Nagar, Bangalore','','₹82 L Onwards'],
 ['Prestige Suncrest','home/suncrest','Prestige Suncrest is a 6-acre premium residential project in Electronic City, offering 1, 2, and 3 BHK homes with lush green spaces, excellent connectivity, and proximity to metro, tech parks, schools, and hospitals.','71 L','1, 2 & 3 BHK Apartment','691 - 2005','Bangalore, Electronic City','','₹71 L Onwards'],
 [properties[5][0],'eternia-full',...properties[5].slice(2),'₹1.06 Cr Onwards'],[properties[4][0],'morgan-full',...properties[4].slice(2),'₹1.25 Cr Onwards'],
 ];
 const awardWindow=Array.from({length:mobile?1:5},(_,i)=>data.awards[(award+i)%data.awards.length]);
 const builderWindow=Array.from({length:data.builders.length},(_,i)=>data.builders[(builder+i)%data.builders.length]);
 const [expandedReviews,setExpandedReviews]=useState({});
 function moveReview(direction){interacted.current.review=true;setReview(i=>(i+direction+data.reviews.length)%data.reviews.length)}
 function stars(summary=false){return <div className={summary?'review-stars review-summary-stars':'review-stars'} aria-label={summary?'4.5 out of 5 stars':'5 out of 5 stars'}>{Array.from({length:5},(_,i)=><svg key={i} viewBox="0 0 24 24" aria-hidden="true"><defs>{summary&&i===4&&<linearGradient id="review-half-star"><stop offset="50%" stopColor="#fbbc04"/><stop offset="50%" stopColor="#ccc"/></linearGradient>}</defs><path fill={summary&&i===4?'url(#review-half-star)':'currentColor'} d="m12 1.5 3.2 6.8 7.4 1-5.4 5.2 1.3 7.5-6.5-3.6-6.5 3.6 1.3-7.5L.9 9.3l7.9-1z"/></svg>)}{!summary&&<span className="review-check" aria-label="Verified review">✓</span>}</div>}

 return <div className="home-content">
  <section className="home-hero home-bleed" style={{backgroundImage:`url(${data.hero})`}}>
   <div className="home-search-panel">
    <h2 className="home-desktop-title">Find your <span>Dream home</span> with Prop Times</h2>
    <h2 className="home-mobile-title">Find Your <span>Dream Home</span><br/>With Prop Times</h2>
    <form className="home-search-form" onSubmit={search}>
     <SearchSelect label="Select City" options={cities} value={city} onChange={e=>{setCity(e.target.value);setArea('')}} location/>
     <SearchSelect label={mobile?'Select Area':'All Locations'} options={areaOptions} value={area} onChange={e=>setArea(e.target.value)} location/>
     <input className="home-keyword" aria-label="Search properties" placeholder="Search for Apartments / Villas / Ready To Move..." value={keyword} onChange={e=>setKeyword(e.target.value)}/>
     <button className="orange home-search-submit" type="submit" aria-label="Search properties"><SearchIcon/><span>Search</span></button>
    </form>
    <div className="home-hero-categories">{['Apartments','Villas','Plots','Ongoing','Pre Launch','Ready to Move'].map(type=><button className="muted-button" key={type} onClick={()=>search(null,type)}>{type}</button>)}</div>
   </div>
  </section>
  <section className="home-cities home-bleed" style={{backgroundImage:`url(${data.cityBackground})`}}>
   <Heading title="Explore Properties In Top Cities" subtitle="Look for new nest in cities you love."/>
   <div className="home-city-grid">{data.cities.map(c=><a className="home-city-card" href={`/properties-search/?location=${c.name.toLowerCase()}`} key={c.name} style={{backgroundColor:c.color,'--city-image':`url(${c.image})`}}><h3>{c.name}</h3><span className="city-view">View Properties</span></a>)}</div>
  </section>
  <section className="home-builders" ref={builderRef}>
   <Heading title="Prop Times Collaborates With India's Leading Builders" subtitle="Renowned builders, recognized for their exceptional quality, are frequently highlighted in the Prop Times."/>
   <div className="home-builder-grid"><div className="home-builder-track" key={builder} onTransitionEnd={()=>{if(builderSlide===data.builders.length)setBuilderSlide(0)}} style={{'--builder-step':builderSlide,transition:builderSlide===0?'none':undefined,'--builder-count':data.builders.length,'--builder-duration':`${data.builders.length * 1.2}s`}}>{[...builderWindow,...builderWindow].map((b,i)=><div className="home-builder-logo" key={`${b.image}-${i}`} aria-hidden={i>=builderWindow.length?true:undefined}><img src={b.image} alt={b.name}/></div>)}</div></div>
   <div className="home-builder-count"><button aria-label="Previous builders" onClick={()=>{interacted.current.builder=true;setBuilder(i=>(i-1+data.builders.length)%data.builders.length)}}>‹</button><span>{((builder-4+data.builders.length)%data.builders.length)+1} / {data.builders.length}</span><button aria-label="Next builders" onClick={()=>{interacted.current.builder=true;setBuilder(i=>(i+1)%data.builders.length)}}>›</button></div>
  </section>
  <section className="home-promotion" ref={bannerRef} aria-label="Featured property promotions">
   <div className="home-promotion-images">{data.banners.map((src,i)=><a key={src} href="/properties-search/" className={i===banner?'active':''} aria-hidden={i!==banner} tabIndex={i===banner?0:-1}><img src={src} alt={['Brigade Eternia — Find joy in the journey.','Prestige Suncrest','Prestige Southern Star','Featured properties','Find your new home'][i]}/></a>)}</div>
   <Dots count={data.banners.length} active={banner} onChange={i=>{interacted.current.banner=true;setBanner(i)}} label="Show promotion"/>
  </section>
  <section className="home-featured">
   <Heading title="Properties You Might Like On Prop Times." subtitle="Prop Times presents a selection of properties that align with your specified criteria."/>
   <div className="property-grid grid grid-cols-1 md:grid-cols-2">{featured.map(renderProperty)}</div>
   <a className="orange home-more" href="/properties-search/">View More Properties <Arrow/></a>
  </section>
  <section className="home-process home-bleed">
   <Heading title="Our Process At Prop Times" subtitle="Your Journey to a New Home Starts Here"/>
   <div className="home-process-grid">{processes.map(([title,text],i)=><article className="home-process-card" key={title}><img src={data.process[i]} alt="" loading="lazy"/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
  </section>
  <section className="home-blogs">
   <Heading title="Explore Our Latest Blogs" subtitle="Stay Informed and Inspired"/>
   <div className="home-blog-grid">{data.blogs.map(blog=><article className="home-blog-card" key={blog.title}><a href={blog.url}><img src={blog.image} alt={blog.name} loading="lazy"/></a><div className="home-blog-content"><div className="home-blog-meta"><a href="https://proptimes.org/category/project-review/">Project Review</a><time>{blog.date}</time></div><h3><a href={blog.url}>{blog.title}</a></h3><p>{blog.excerpt}</p></div></article>)}</div>
   <a className="orange home-more" href="https://proptimes.org/blogs/">View More Blog <Arrow/></a>
  </section>
  <section className="home-awards home-bleed" ref={awardRef}>
   <Heading title="Our Awards and Recognitions" subtitle="Recognizing Excellence in Real Estate"/>
   <div className="home-award-grid">{awardWindow.map((a,i)=><article className="home-award" tabIndex="0" key={`${a.image}-${i}`}><img src={a.image} alt={a.title} loading="lazy"/><div className="home-award-back"><h3>{a.title}</h3><p>{a.description}</p></div></article>)}</div>
   <Dots count={data.awards.length} active={(award-Math.max(0,data.awards.findIndex(a=>a.title==='NCC Urban'))+data.awards.length)%data.awards.length} onChange={i=>{interacted.current.award=true;setAward((i+Math.max(0,data.awards.findIndex(a=>a.title==='NCC Urban')))%data.awards.length)}} label="Show award"/>
  </section>
  <section className="home-reviews" ref={reviewRef}>
   <Heading title="What our clients have to say" subtitle="Hear from Satisfied Homebuyers and Sellers"/>
   <div className="home-review-layout">
    <div className="home-review-summary"><strong>EXCELLENT</strong>{stars(true)}<p>Based on <b>201 reviews</b></p><img src={data.googleLogo} alt="Google"/></div>
    <div className="home-review-slider">
     <div className="home-review-viewport"><div className="home-review-track" style={{'--review-step':review,transition:review===0?'none':undefined}} onTransitionEnd={()=>{if(review===data.reviews.length)setReview(0)}}>{[...data.reviews,...data.reviews].map((r,i)=><article className="home-review-card" key={i} aria-hidden={i<review||i>=review+(mobile?1:3)}><div className="home-review-person"><img src={r.image} alt="" loading="lazy"/><div><strong>{r.name}</strong><span className="home-review-date">1 year ago</span></div><img className="home-review-google" src={data.googleIcon} alt="Google"/></div>{stars()}<p className={expandedReviews[r.name]?'expanded':''}>{r.text}</p>{r.text.length>125&&<button className="home-review-read" onClick={()=>setExpandedReviews(v=>({...v,[r.name]:!v[r.name]}))}>{expandedReviews[r.name]?'Read less':'Read more'}</button>}</article>)}</div></div>
     <button className="home-review-arrow previous" aria-label="Previous reviews" onClick={()=>moveReview(-1)}><svg viewBox="0 0 20 20"><path d="m12 4-6 6 6 6"/></svg></button><button className="home-review-arrow next" aria-label="Next reviews" onClick={()=>moveReview(1)}><svg viewBox="0 0 20 20"><path d="m8 4 6 6-6 6"/></svg></button>
    </div>
   </div><p className="home-review-verified">Verified by Trustindex <span aria-hidden="true">ⓘ</span></p>
  </section>
 </div>
}
