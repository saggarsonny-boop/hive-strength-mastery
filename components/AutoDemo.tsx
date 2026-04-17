'use client'

import { useEffect, useState, useRef } from 'react'

const DEMO_KEY = 'hive_demo_strength'

const DEMO_INPUT = "42 year old, training 6 months, stuck on 100kg squat for 8 weeks"

const DEMO_RESPONSE = {
  headline: "Plateau Protocol · 4-Week Reset",
  weeks: [
    { label: "Week 1–2", value: "Drop to 85kg · 5×5 · Focus bar path, depth, brace" },
    { label: "Week 3",   value: "90kg · 4×4 · Controlled descent, full drive" },
    { label: "Week 4",   value: "Test 102.5kg" },
  ],
  insight: "Your plateau is neural, not muscular — the drop-and-reset breaks it in 85% of cases.",
  flag: "Also: are you sleeping 7+ hours? Plateau rate doubles below 6hrs."
}

export default function AutoDemo() {
  const [phase, setPhase] = useState<'hidden'|'typing'|'response'|'fading'>('hidden')
  const [typedText, setTypedText] = useState('')
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
    if (typeof window === 'undefined') return
    if (localStorage.getItem(DEMO_KEY)) return

    const start = setTimeout(() => {
      setPhase('typing')
      let i = 0
      const ti = setInterval(() => {
        i++
        setTypedText(DEMO_INPUT.slice(0, i))
        if (i >= DEMO_INPUT.length) {
          clearInterval(ti)
          setTimeout(() => {
            setPhase('response')
            setTimeout(() => {
              setPhase('fading')
              setTimeout(() => { setPhase('hidden'); localStorage.setItem(DEMO_KEY,'1'); }, 600)
            }, 8000)
          }, 500)
        }
      }, 42)
    }, 1200)

    return () => clearTimeout(start)
  }, [])

  if (phase === 'hidden') return null

  const dismiss = () => {
    setPhase('fading')
    setTimeout(() => { setPhase('hidden'); localStorage.setItem(DEMO_KEY,'1'); }, 600)
  }

  return (
    <div
      style={{
        position:'fixed',inset:0,zIndex:9999,
        background:'rgba(5,5,10,0.88)',
        backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',
        display:'flex',alignItems:'center',justifyContent:'center',padding:'24px',
        opacity:phase==='fading'?0:1,transition:'opacity 0.6s ease',
        pointerEvents:phase==='fading'?'none':'auto',
        fontFamily:'system-ui,-apple-system,sans-serif',
      }}
      onClick={dismiss}
    >
      <div
        style={{width:'100%',maxWidth:'520px',display:'flex',flexDirection:'column',gap:'14px',animation:'demoIn 0.5s ease'}}
        onClick={e=>e.stopPropagation()}
      >
        <div style={{fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(200,160,60,0.5)',textAlign:'center',marginBottom:'2px'}}>
          Here's how it works
        </div>

        {/* Input */}
        <div style={{background:'rgba(12,12,18,0.95)',border:'1px solid rgba(200,160,60,0.25)',borderRadius:'12px',padding:'14px 18px',fontSize:'15px',color:'#f0f0f0',lineHeight:'1.5',minHeight:'56px'}}>
          {typedText || <span style={{color:'rgba(120,120,140,0.6)'}}>Your age, training history, what you're working on…</span>}
          {phase==='typing' && <span style={{display:'inline-block',width:'2px',height:'15px',background:'#d4af37',marginLeft:'1px',verticalAlign:'middle',animation:'blink 0.7s step-end infinite'}}/>}
        </div>

        {/* Response */}
        {phase==='response' && (
          <div style={{background:'rgba(12,12,18,0.95)',border:'1px solid rgba(200,160,60,0.2)',borderRadius:'12px',padding:'20px 22px',animation:'demoIn 0.4s ease'}}>
            <div style={{fontSize:'11px',color:'rgba(200,160,60,0.5)',letterSpacing:'0.08em',marginBottom:'10px'}}>AI PROGRAMME</div>
            <div style={{fontSize:'17px',fontWeight:700,color:'#f0f0f0',marginBottom:'14px'}}>{DEMO_RESPONSE.headline}</div>
            <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'14px'}}>
              {DEMO_RESPONSE.weeks.map(w=>(
                <div key={w.label} style={{display:'flex',gap:'12px',fontSize:'13px'}}>
                  <span style={{color:'rgba(200,160,60,0.6)',minWidth:'72px',flexShrink:0}}>{w.label}</span>
                  <span style={{color:'rgba(220,220,230,0.8)'}}>{w.value}</span>
                </div>
              ))}
            </div>
            <div style={{fontSize:'13px',color:'rgba(180,200,220,0.6)',fontStyle:'italic',marginBottom:'10px',lineHeight:'1.5'}}>
              {DEMO_RESPONSE.insight}
            </div>
            <div style={{background:'rgba(212,175,55,0.06)',border:'1px solid rgba(212,175,55,0.15)',borderRadius:'8px',padding:'9px 13px',fontSize:'12px',color:'rgba(212,175,55,0.7)',lineHeight:'1.5'}}>
              💤 {DEMO_RESPONSE.flag}
            </div>
          </div>
        )}

        <button onClick={dismiss} style={{alignSelf:'center',background:'none',border:'1px solid rgba(200,160,60,0.2)',borderRadius:'100px',padding:'8px 24px',color:'rgba(200,160,60,0.5)',fontSize:'12px',fontFamily:'inherit',cursor:'pointer',transition:'all 0.2s'}}>
          Got it — let me try
        </button>
      </div>
      <style>{`@keyframes demoIn{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  )
}
