export default function Pagination({page, pageSize, total, onPage}){
  const pages = Math.max(1, Math.ceil(total / pageSize))
  if (pages <= 1) return null
  const items = []
  for(let i=Math.max(1,page-2); i<=Math.min(pages,page+2); i++){
    items.push(i)
  }
  return (
    <div className="flex gap-2 justify-center mt-6">
      <button className="btn" disabled={page<=1} onClick={()=>onPage(page-1)}>Prev</button>
      {items.map(i=>(
        <button key={i} onClick={()=>onPage(i)} className={`px-3 py-2 rounded-xl border ${i===page?'bg-black text-white':'bg-white'}`}>{i}</button>
      ))}
      <button className="btn" disabled={page>=pages} onClick={()=>onPage(page+1)}>Next</button>
    </div>
  )
}
