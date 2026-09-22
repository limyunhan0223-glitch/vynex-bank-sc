export type DemoState={username:string;password:string;remember:boolean;phase:'editing'|'processing'|'submitted';simulationSubmitted:boolean};
export const emptyDemo=():DemoState=>({username:'',password:'',remember:false,phase:'editing',simulationSubmitted:false});
// No copy of the incoming values survives submission, including Remember me.
export function submitDemo(_state:DemoState):DemoState{return {...emptyDemo(),phase:'processing'};}
export function completeDemo(state:DemoState):DemoState{return state.phase==='processing'?{...emptyDemo(),phase:'submitted',simulationSubmitted:true}:state;}
