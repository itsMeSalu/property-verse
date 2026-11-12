import React from 'react';
import './contact.css';

function Icon({type}){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={type==='phone'?2:1} aria-hidden="true">{type==='email'?<><rect x="2" y="5" width="20" height="14" rx="3"/><path d="m6 9 6 4 6-4"/></>:type==='phone'?<path d="M5 3H2c0 11 8 19 19 19v-6l-5-1-2 3c-4-2-7-5-8-8l3-2-1-5z"/>:<path d="m3 10 15-7c3-1 4 1 3 3l-7 15c-1 2-3 1-3-1l-1-6-6-1c-2 0-3-2-1-3Z"/>}</svg>}
const cards=[
 {title:'Email',text:'Operations@proptimes.org',href:'mailto:Operations@proptimes.org',icon:'email'},
 {title:'Phone',text:'+91 7411364999',href:'tel:+917411364999',icon:'phone'},
 {title:'Bangalore',text:'5th Floor, Beta Block, Sigma tech Park, Bangalore – 560066',icon:'location'},
 {title:'Pune',text:"#904,GERA's Imperium Rise, Hinjewadi Phase 2, Pune - 411057",icon:'location'},
];
export default function Contact(){return <section className="contact-page-intro">
 <h1>We are just a call away</h1><p>Have questions or ready to start your property search?<br/>Send us a message, and our team will assist you!</p>
 <div className="contact-page-cards">{cards.map(c=><article className={`contact-page-card ${c.icon}`} key={c.title}><span className="contact-page-icon"><Icon type={c.icon}/></span><div><h2>{c.title}</h2>{c.href?<a href={c.href}>{c.text}</a>:<p>{c.text}</p>}</div></article>)}</div>
 </section>}
