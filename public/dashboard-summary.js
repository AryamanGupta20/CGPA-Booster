/* The dashboard reads saved study data without mounting every tool. */
window.renderDashboardSummary=function(data={}){
 const esc=Campus.esc,study=data.study;
 let next=null,warning='';
 if(study){
  const result=window.CampusStudy.plan(study);
  next=result.days.flatMap(day=>day.tasks.map(task=>({...task,date:day.date})))[0];
  if(result.errors.length)warning='Review your dates and study estimates in the planner.';
  else if(result.unplaced.length)warning='Some work does not fit before your exams. Review the plan.';
 }
 const button=(key,label)=>`<button type="button" data-co="tool" data-value="${key}">${label}</button>`;
 return `<section class="study-summary" aria-label="Continue your work"><div><p class="kicker">Your saved work</p><h2>${next?'Next on your study plan':'Plan your next exam'}</h2><p>${next?esc(next.date+' · '+next.title)+' · '+Number(next.minutes)+' minutes':'Add your exam dates, syllabus units and daily study time.'}</p>${warning?`<p role="status">${esc(warning)}</p>`:''}${button('exams',next?'Continue exam preparation':'Open exam planner')}</div><aside><h3>${data.course?'Continue your course':'Choose your degree'}</h3><p>${data.course?'Return to your saved course and subject playlists.':'No degree is selected for you. Choose the one you study.'}</p>${button('courses',data.course?'Open my course':'Choose my course')}<h3>Your résumé</h3><p>${data.resume?.name?'Your saved details are ready to review.':'Add education, projects and skills when you are ready.'}</p>${button('resume','Open résumé builder')}</aside></section>`;
};
