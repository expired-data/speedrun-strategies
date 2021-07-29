/*! For license information please see bundle.js.LICENSE.txt */
  margin: 60px 0 0;
  padding: 50px;
  background-color: #eee;
  overflow: auto;
  min-height: calc(100vh - 60px);
`,o=a.default.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background-color: #eee;
  padding-left: 30px;
  box-shadow: 0 4px 8px -1px #ccc;
`,l=a.default.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
`;t.PageWrapper=({children:e})=>c.default.createElement(c.default.Fragment,null,c.default.createElement(o,null,c.default.createElement(l,null,"SRS"))," ",c.default.createElement(i,null,e))},395:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),a(n(46),t),a(n(699),t)},46:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(a,c){function i(e){try{l(r.next(e))}catch(e){c(e)}}function o(e){try{l(r.throw(e))}catch(e){c(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,o)}l((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.useGetData=t.getRun=t.getLeaderboards=t.getCategories=t.getGames=t.GameLinkType=void 0;const a=n(7294),c="https://www.speedrun.com/api/v1";var i,o;(o=t.GameLinkType||(t.GameLinkType={})).Self="self",o.Runs="runs",o.Levels="levels",o.Categories="categories",o.Variables="variables",o.Records="records",o.Series="series",o.BaseGame="base-game",o.DerivedGames="derived-games",o.RomHacks="romhacks",o.Leaderboard="leaderboard",function(e){e.Next="next",e.Previous="prev"}(i||(i={})),t.getGames=e=>r(void 0,void 0,void 0,(function*(){let t=`${c}/games?`;return e&&(t+=`&name=${e}`),(yield(yield fetch(t)).json()).data})),t.getCategories=e=>r(void 0,void 0,void 0,(function*(){const t=`${c}/games/${e}/categories`;return(yield(yield fetch(t)).json()).data})),t.getLeaderboards=(e,t)=>r(void 0,void 0,void 0,(function*(){const n=`${c}/leaderboards/${t}/category/${e}?embed=players`;return(yield(yield fetch(n)).json()).data})),t.getRun=e=>r(void 0,void 0,void 0,(function*(){const t=`${c}/runs/${e}`;return(yield(yield fetch(t)).json()).data})),t.useGetData=(e,...t)=>{const[n,r]=a.useState();return a.useEffect((()=>{r(void 0),e(...t).then(r)}),[...t]),n}},699:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useGetStrats=void 0;const r=n(6829),a=n(7294),c=r.gql`
  mutation addStrat(
    $comment: String = ""
    $name: String = ""
    $run: String = ""
    $timestamp: Int = 0
  ) {
    insert_strats(
      objects: {
        comment: $comment
        name: $name
        run: $run
        timestamp: $timestamp
      }
    ) {
      returning {
        id
      }
    }
  }
`,i=r.gql`
  mutation deleteStrat($id: uuid = "") {
    delete_strats(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;t.useGetStrats=e=>{const[t,n]=a.useState([]),o=a.useMemo((()=>{return t=e,r.gql`
  query getStrats {
    strats(where: { run: { _eq: "${t}" } }) {
      comment
      id
      name
      run
      timestamp
    }
  }
`;var t}),[e]),{data:l}=r.useQuery(o);a.useEffect((()=>{(null==l?void 0:l.strats)&&n(l.strats)}),[l]);const[s]=r.useMutation(c),[u]=r.useMutation(i);return{strats:t,addStrat:e=>{s({variables:{comment:e.comment,name:e.name,run:e.run,timestamp:e.timestamp}}).then((({data:t})=>{var r,a;(null===(a=null===(r=t.insert_strats)||void 0===r?void 0:r.returning[0])||void 0===a?void 0:a.id)&&n((n=>{var r,a;return[...n,Object.assign(Object.assign({},e),{id:null===(a=null===(r=t.insert_strats)||void 0===r?void 0:r.returning[0])||void 0===a?void 0:a.id})]}))}))},deleteStrat:e=>{u({variables:{id:e.id}}),n((t=>t.filter((t=>t.id!==e.id))))}}}},2204:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),c=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Search=void 0;const o=c(n(7294)),l=i(n(9163)),s=n(7625),u=n(1436),f=l.default.div`
  display: flex;
  height: calc(${e=>e.height||"1rem"} + 1rem);
  border: 2px solid #dadada;
  border-radius: 7px;
  width: 500px;

  &:hover,
  :focus-within {
    outline: none;
    border-color: #9ecaed;
    box-shadow: 0 0 10px #9ecaed;
  }

  input {
    font-size: ${e=>e.height||"1rem"};
  }

  button {
    background-color: transparent;
    outline: none;
    border-style: none none none solid;
    border-color: #dadada;
    :hover {
      cursor: pointer;
    }
  }
`,h=l.default.input`
  flex: 1;
  padding-left: 5px;
  outline: none;
  border: none;
`,p=l.default(s.FontAwesomeIcon)`
  padding: 0 5px;
`;t.Search=({inputProps:e,height:t,onSearch:n})=>{const r=o.useRef();return o.useEffect((()=>{r.current.addEventListener("keydown",(e=>{"Enter"===e.code&&n(r.current.value)}))}),[r]),o.default.createElement(f,{height:t},o.default.createElement(h,Object.assign({ref:r},e)),o.default.createElement("button",{onClick:()=>{n(r.current.value)}},o.default.createElement(p,{icon:u.faSearch})))}},5743:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Table=void 0;const a=r(n(7294)),c=n(9521),i=r(n(9163)),o=i.default.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: min(20px, 5vh);
`,l=i.default.tr`
  background-color: ${({index:e})=>e%2?"#f2f2f2":"white"};
  border: 1px solid white;
  ${({selectable:e})=>e?"&:hover, :focus-within { \n        cursor: pointer;\n        outline: none;\n        border-color: #9ecaed;\n        box-shadow: 0 0 10px #9ecaed;\n        z-index: 10;\n    }":""}
`,s=i.default.td`
  text-align: center;
`;t.Table=({data:e,columns:t,className:n,rowClick:r})=>{const{getTableProps:i,getTableBodyProps:u,headerGroups:f,prepareRow:h,rows:p}=c.useTable({data:e,columns:t});return a.default.createElement(o,Object.assign({className:n},i()),a.default.createElement("thead",null,f.map((e=>a.default.createElement(l,Object.assign({index:1},e.getHeaderGroupProps()),e.headers.map((e=>a.default.createElement("th",Object.assign({},e.getHeaderProps()),e.render("Header")))))))),a.default.createElement("tbody",Object.assign({},u()),p.map(((e,t)=>(h(e),a.default.createElement(l,Object.assign({selectable:!0,index:t,onClick:(e=>()=>{r&&r(e)})(e)},e.getRowProps()),e.cells.map((e=>a.default.createElement(s,Object.assign({},e.getCellProps()),e.render("Cell"))))))))))}},2629:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=r(n(7294)),c=r(n(3935)),i=n(8957),o=n(6829),l=new o.ApolloClient({uri:"https://ruling-boa-15.hasura.app/v1/graphql",cache:new o.InMemoryCache});c.default.render(a.default.createElement(o.ApolloProvider,{client:l},a.default.createElement(i.App,null)),document.getElementById("app"))},4795:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.GameCard=void 0;const a=r(n(7294)),c=n(3335),i=r(n(9163)).default.div`
  border: 1px solid #cdcdcd;
  margin: 20px;
  width: 400px;
  height: 5em;
  padding: 5px;
  float: left;
  font-size: large;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;t.GameCard=({game:e})=>{const t=c.useHistory();return a.default.createElement(i,{onClick:()=>t.push(`/game/${e.id}`)},a.default.createElement("span",null,e.names.international),a.default.createElement("br",null))}},7584:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),c=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.GamesList=void 0;const o=c(n(7294)),l=i(n(9163)),s=n(395),u=n(4795),f=n(2204),h=n(216),p=l.default.div`
  display: flex;
  justify-content: space-between;
`,d=l.default.div`
  display: flex;
`,v=l.default.div`
  display: flex;
  align-items: center;
`;t.GamesList=()=>{const[e,t]=o.useState(""),n=s.useGetData(s.getGames,e),r=h.useWindowSize(),a=Math.floor((r.width||700)/500);return n?o.default.createElement("div",null,o.default.createElement(p,null,o.default.createElement("h1",null,"Games ",e&&`(${e})`),o.default.createElement(v,{"data-testid":"search"},o.default.createElement(f.Search,{onSearch:t}))),n.map((e=>o.default.createElement(u.GameCard,{game:e,key:e.id}))).reduce(((e,t,n)=>(n%a||(e[Math.floor(n/a)]=new Array),e[Math.floor(n/a)].push(t),e)),[]).map(((e,t)=>o.default.createElement(d,{key:t},e)))):o.default.createElement(o.default.Fragment,null,"Loading...")}},2959:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),c=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.RunBoard=void 0;const i=c(n(7294)),o=n(3335),l=n(395),s=n(4418),u=n(5743);t.RunBoard=({categoryId:e,gameId:t,onlyWithStrats:n})=>{const r=o.useHistory(),a=l.useGetData(l.getLeaderboards,e,t),c=i.useMemo((()=>(null==a?void 0:a.runs.map((e=>Object.assign(Object.assign({},e.run),{players:e.run.players.map((e=>{let t;if(t=e.id?a.players.data.find((t=>t.id===e.id)):a.players.data.find((t=>t.name===e.name)),!t)throw new Error("Unable to find player name");return t})),place:e.place,strats:[]}))).filter((e=>!n||e.strats.length>0)))||[]),[a,n]),f=i.useMemo((()=>[{accessor:"place",Header:"Position"},{accessor:"times",Cell:({value:{primary:e}})=>i.default.createElement(i.default.Fragment,null,s.splitTime(e)),Header:"Time"},{accessor:"players",Cell:({value:e})=>i.default.createElement(i.default.Fragment,null,e.map((e=>e.name||e.names.international)).join(", ")),Header:"Player"},{accessor:"strats",Cell:({value:e})=>i.default.createElement(i.default.Fragment,null,e.length),Header:"Number of strats"}]),[]);return a?i.default.createElement(u.Table,{data:c,columns:f,rowClick:e=>{r.push(`/run/${e.original.id}`)}}):i.default.createElement("div",null,"Loading...")}},8852:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),c=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Game=void 0;const o=c(n(7294)),l=n(395),s=n(2959),u=i(n(9163)).default.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;t.Game=({match:{params:{id:e}}})=>{const t=l.useGetData(l.getCategories,e),[n,r]=o.useState(""),[a,c]=o.useState(!0);return o.useEffect((()=>{t&&r(t[0].id)}),[t]),t?o.default.createElement(o.default.Fragment,null,o.default.createElement(u,null,o.default.createElement("div",null,"Category:"," ",o.default.createElement("select",{onChange:e=>r(e.currentTarget.value)},t.map((e=>o.default.createElement("option",{value:e.id,key:e.id},e.name))))),o.default.createElement("div",null,"Only show runs with strats"," ",o.default.createElement("input",{type:"checkbox",defaultChecked:!0,onChange:e=>c(e.target.checked)}))),n&&o.default.createElement(s.RunBoard,{onlyWithStrats:a,categoryId:n,gameId:e})):o.default.createElement(o.default.Fragment,null,"Loading...")}},6505:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.NotFound=void 0;const a=r(n(7294)),c=r(n(9163)).default.div`
  margin: auto;
  width: 500px;
  margin-top: 20vh;
  text-align: center;
  font-size: 2rem;
`;t.NotFound=()=>a.default.createElement(c,null,"The page you are looking for does not exist.")},283:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),c=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.AddStratForm=void 0;const i=n(1436),o=n(7625),l=c(n(7294));t.AddStratForm=({time:e,addStrat:t,run:n})=>{const[r,a]=l.useState(),[c,s]=l.useState(""),[u,f]=l.useState("");return l.default.createElement("div",null,l.default.createElement("h1",null,"Add New Strat"),l.default.createElement("label",{htmlFor:"timestamp"},"timestamp (s):"),l.default.createElement("input",{type:"number",id:"timestamp",name:"timestamp",value:void 0===r?Math.round(e):r,onChange:e=>{a(+e.target.value)}}),l.default.createElement("button",{onClick:()=>a(void 0)},l.default.createElement(o.FontAwesomeIcon,{icon:i.faRedo})),l.default.createElement("br",null),l.default.createElement("label",{htmlFor:"name"},"name:"),l.default.createElement("input",{type:"text",id:"name",name:"name",value:c,onChange:e=>{s(e.target.value)}}),l.default.createElement("br",null),l.default.createElement("label",{htmlFor:"comment"},"comment:"),l.default.createElement("textarea",{id:"comment",name:"comment",value:u,rows:4,cols:50,onChange:e=>{f(e.target.value)}}),l.default.createElement("br",null),l.default.createElement("button",{onClick:()=>{t({id:"",run:n,timestamp:void 0===r?Math.round(e):r,name:c,comment:u}),a(void 0),s(""),f("")}},"Add"))}},1783:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.StratDisplay=void 0;const a=n(1436),c=n(7625),i=r(n(7294)),o=r(n(9163)),l=n(4418),s=o.default.div`
  display: flex;
`,u=o.default.button`
  display: block;
  margin-left: auto;
`,f=o.default.button`
  all: unset;
  text-decoration: underline;
  color: #0000aa;
  &:hover {
    cursor: pointer;
    color: #0000ff;
  }
`,h=o.default.span`
  font-size: 16px;
`,p=o.default.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 4px 16px;
  margin: 5px 10px 5px 5px;
  ${e=>e.active&&"\n    box-shadow: 0 0 5px rgba(81, 203, 238, 1);\n    border: 1px solid rgba(81, 203, 238, 1);\n    "}
`;t.StratDisplay=({strat:e,jumpToStrat:t,active:n,deleteStrat:r})=>i.default.createElement(p,{id:`strat-${e.id}`,active:n},i.default.createElement(s,null,i.default.createElement("div",null,i.default.createElement(f,{onClick:t},l.secondsToNice(e.timestamp))," ","- ",i.default.createElement(h,null,e.name)),i.default.createElement(u,{onClick:()=>r(e)},i.default.createElement(c.FontAwesomeIcon,{icon:a.faTrash}))),i.default.createElement("p",null,e.comment))},4838:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),c=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.StratsDisplay=void 0;const o=c(n(7294)),l=i(n(9163)),s=n(1783),u=l.default.div`
  height: 500px;
  overflow: scroll;
  width: 100%;
  position: relative;
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;t.StratsDisplay=({time:e,setTime:t,strats:n,deleteStrat:r})=>{const[a,c]=o.useState([...n.sort(((e,t)=>e.timestamp-t.timestamp))][0]),i=o.useRef();return o.useEffect((()=>{var t;const r=[...n.sort(((e,t)=>e.timestamp-t.timestamp))].filter((t=>t.timestamp<=e)).pop();if(r&&r!==a){c(r);const e=null===(t=document.getElementById(`strat-${r.id}`))||void 0===t?void 0:t.offsetTop;i.current.scrollTop=e||0}}),[e]),o.default.createElement(u,{ref:i},n.map((e=>o.default.createElement(s.StratDisplay,{strat:e,jumpToStrat:()=>t(e.timestamp),active:e===a,deleteStrat:r}))))}},7137:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),c=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Run=void 0;const o=c(n(7294)),l=i(n(2004)),s=n(395),u=i(n(9163)),f=n(4838),h=n(283),p=u.default.div`
  display: flex;
  justify-content: space-between;
`,d=u.default(l.default)`
  flex: none;
`;t.Run=({match:{params:{id:e}}})=>{var t;const n=s.useGetData(s.getRun,e),{strats:r,addStrat:a,deleteStrat:c}=s.useGetStrats((null==n?void 0:n.id)||""),[i,l]=o.useState(0),u=o.useRef();return n?o.default.createElement("div",null,o.default.createElement(p,null,o.default.createElement(d,{url:null===(t=n.videos.links[0])||void 0===t?void 0:t.uri,controls:!0,width:"min(900px, 75%)",height:500,ref:u,progressInternal:100,onProgress:({playedSeconds:e})=>l(e),onPlay:()=>l(u.current.getCurrentTime())}),o.default.createElement(f.StratsDisplay,{strats:r,time:i,setTime:e=>{u.current.seekTo(e)},deleteStrat:c})),o.default.createElement(h.AddStratForm,{time:i,run:n.id,addStrat:a})):o.default.createElement(o.default.Fragment,null,"Loading...")}},6196:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Routes=void 0;const a=r(n(7294)),c=n(3335),i=n(6505),o=n(7584),l=n(8852),s=n(7137);t.Routes=()=>a.default.createElement(c.BrowserRouter,null,a.default.createElement(c.Switch,null,a.default.createElement(c.Route,{component:o.GamesList,path:"/games",exact:!0}),a.default.createElement(c.Route,{component:l.Game,path:"/game/:id"}),a.default.createElement(c.Route,{component:s.Run,path:"/run/:id"}),a.default.createElement(c.Route,{component:i.NotFound})," "))},4418:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.secondsToNice=t.splitTime=void 0,t.splitTime=e=>{const t=e.slice(2).trim(),[,n,r,a]=t.split(/H|M|S/gi).reverse();return`${a?a+"h":""} ${r?r.padStart(2,"0")+"m":""} ${n?(Number(n)>=10?n:"0"+n)+"s":""}`},t.secondsToNice=e=>{const t=Math.floor(e/60/60),n=Math.floor(e/60-60*t),r=Math.round(e-60*n-60*t*60);return`${t.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}`}},216:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getScrollbarWidth=t.useWindowSize=void 0;const r=n(7294);t.useWindowSize=()=>{const[e,t]=r.useState({});return r.useEffect((()=>{function e(){t({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)}),[]),e},t.getScrollbarWidth=()=>{const e=document.createElement("div");e.style.visibility="hidden",e.style.overflow="scroll",document.body.appendChild(e);const t=document.createElement("div");e.appendChild(t);const n=e.offsetWidth-t.offsetWidth;return e.parentNode.removeChild(e),n}},9329:(e,t,n)=>{e.exports=n(516).Observable},516:(e,t)=>{"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}t.Observable=void 0;var c=function(){return"function"==typeof Symbol},i=function(e){return c()&&Boolean(Symbol[e])},o=function(e){return i(e)?Symbol[e]:"@@"+e};c()&&!i("observable")&&(Symbol.observable=Symbol("observable"));var l=o("iterator"),s=o("observable"),u=o("species");function f(e,t){var n=e[t];if(null!=n){if("function"!=typeof n)throw new TypeError(n+" is not a function");return n}}function h(e){var t=e.constructor;return void 0!==t&&null===(t=t[u])&&(t=void 0),void 0!==t?t:w}function p(e){return e instanceof w}function d(e){d.log?d.log(e):setTimeout((function(){throw e}))}function v(e){Promise.resolve().then((function(){try{e()}catch(e){d(e)}}))}function m(e){var t=e._cleanup;if(void 0!==t&&(e._cleanup=void 0,t))try{if("function"==typeof t)t();else{var n=f(t,"unsubscribe");n&&n.call(t)}}catch(e){d(e)}}function y(e){e._observer=void 0,e._queue=void 0,e._state="closed"}function g(e,t,n){e._state="running";var r=e._observer;try{var a=f(r,t);switch(t){case"next":a&&a.call(r,n);break;case"error":if(y(e),!a)throw n;a.call(r,n);break;case"complete":y(e),a&&a.call(r)}}catch(e){d(e)}"closed"===e._state?m(e):"running"===e._state&&(e._state="ready")}function b(e,t,n){if("closed"!==e._state){if("buffering"!==e._state)return"ready"!==e._state?(e._state="buffering",e._queue=[{type:t,value:n}],void v((function(){return function(e){var t=e._queue;if(t){e._queue=void 0,e._state="ready";for(var n=0;n<t.length&&(g(e,t[n].type,t[n].value),"closed"!==e._state);++n);}}(e)}))):void g(e,t,n);e._queue.push({type:t,value:n})}}var z=function(){function e(t,r){n(this,e),this._cleanup=void 0,this._observer=t,this._queue=void 0,this._state="initializing";var a=new C(this);try{this._cleanup=r.call(void 0,a)}catch(e){a.error(e)}"initializing"===this._state&&(this._state="ready")}return a(e,[{key:"unsubscribe",value:function(){"closed"!==this._state&&(y(this),m(this))}},{key:"closed",get:function(){return"closed"===this._state}}]),e}(),C=function(){function e(t){n(this,e),this._subscription=t}return a(e,[{key:"next",value:function(e){b(this._subscription,"next",e)}},{key:"error",value:function(e){b(this._subscription,"error",e)}},{key:"complete",value:function(){b(this._subscription,"complete")}},{key:"closed",get:function(){return"closed"===this._subscription._state}}]),e}(),w=function(){function e(t){if(n(this,e),!(this instanceof e))throw new TypeError("Observable cannot be called as a function");if("function"!=typeof t)throw new TypeError("Observable initializer must be a function");this._subscriber=t}return a(e,[{key:"subscribe",value:function(e){return"object"==typeof e&&null!==e||(e={next:e,error:arguments[1],complete:arguments[2]}),new z(e,this._subscriber)}},{key:"forEach",value:function(e){var t=this;return new Promise((function(n,r){if("function"==typeof e)var a=t.subscribe({next:function(t){try{e(t,c)}catch(e){r(e),a.unsubscribe()}},error:r,complete:n});else r(new TypeError(e+" is not a function"));function c(){a.unsubscribe(),n()}}))}},{key:"map",value:function(e){var t=this;if("function"!=typeof e)throw new TypeError(e+" is not a function");return new(h(this))((function(n){return t.subscribe({next:function(t){try{t=e(t)}catch(e){return n.error(e)}n.next(t)},error:function(e){n.error(e)},complete:function(){n.complete()}})}))}},{key:"filter",value:function(e){var t=this;if("function"!=typeof e)throw new TypeError(e+" is not a function");return new(h(this))((function(n){return t.subscribe({next:function(t){try{if(!e(t))return}catch(e){return n.error(e)}n.next(t)},error:function(e){n.error(e)},complete:function(){n.complete()}})}))}},{key:"reduce",value:function(e){var t=this;if("function"!=typeof e)throw new TypeError(e+" is not a function");var n=h(this),r=arguments.length>1,a=!1,c=arguments[1],i=c;return new n((function(n){return t.subscribe({next:function(t){var c=!a;if(a=!0,!c||r)try{i=e(i,t)}catch(e){return n.error(e)}else i=t},error:function(e){n.error(e)},complete:function(){if(!a&&!r)return n.error(new TypeError("Cannot reduce an empty sequence"));n.next(i),n.complete()}})}))}},{key:"concat",value:function(){for(var e=this,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];var a=h(this);return new a((function(t){var r,c=0;return function e(i){r=i.subscribe({next:function(e){t.next(e)},error:function(e){t.error(e)},complete:function(){c===n.length?(r=void 0,t.complete()):e(a.from(n[c++]))}})}(e),function(){r&&(r.unsubscribe(),r=void 0)}}))}},{key:"flatMap",value:function(e){var t=this;if("function"!=typeof e)throw new TypeError(e+" is not a function");var n=h(this);return new n((function(r){var a=[],c=t.subscribe({next:function(t){if(e)try{t=e(t)}catch(e){return r.error(e)}var c=n.from(t).subscribe({next:function(e){r.next(e)},error:function(e){r.error(e)},complete:function(){var e=a.indexOf(c);e>=0&&a.splice(e,1),i()}});a.push(c)},error:function(e){r.error(e)},complete:function(){i()}});function i(){c.closed&&0===a.length&&r.complete()}return function(){a.forEach((function(e){return e.unsubscribe()})),c.unsubscribe()}}))}},{key:s,value:function(){return this}}],[{key:"from",value:function(t){var n="function"==typeof this?this:e;if(null==t)throw new TypeError(t+" is not an object");var r=f(t,s);if(r){var a=r.call(t);if(Object(a)!==a)throw new TypeError(a+" is not an object");return p(a)&&a.constructor===n?a:new n((function(e){return a.subscribe(e)}))}if(i("iterator")&&(r=f(t,l)))return new n((function(e){v((function(){if(!e.closed){var n=!0,a=!1,c=void 0;try{for(var i,o=r.call(t)[Symbol.iterator]();!(n=(i=o.next()).done);n=!0){var l=i.value;if(e.next(l),e.closed)return}}catch(e){a=!0,c=e}finally{try{n||null==o.return||o.return()}finally{if(a)throw c}}e.complete()}}))}));if(Array.isArray(t))return new n((function(e){v((function(){if(!e.closed){for(var n=0;n<t.length;++n)if(e.next(t[n]),e.closed)return;e.complete()}}))}));throw new TypeError(t+" is not observable")}},{key:"of",value:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];var a="function"==typeof this?this:e;return new a((function(e){v((function(){if(!e.closed){for(var t=0;t<n.length;++t)if(e.next(n[t]),e.closed)return;e.complete()}}))}))}},{key:u,get:function(){return this}}]),e}();t.Observable=w,c()&&Object.defineProperty(w,Symbol("extensions"),{value:{symbol:s,hostReportError:d},configurable:!0})}},t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(2629)})();