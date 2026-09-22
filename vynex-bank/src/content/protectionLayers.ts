export const PROTECTION_LAYERS=[
 {name:'TECHNICAL',headline:'Technology that detects\nand blocks threats.',copy:'Technical controls help reduce exposure, verify access and detect suspicious activity.',controls:[
  {name:'Multi-Factor Authentication',description:'Requires an additional verification step before account access.',icon:'identity'},
  {name:'Email Filtering',description:'Screens incoming messages to reduce malicious and unwanted email.',icon:'mail'},
  {name:'Anti-Phishing Protection',description:'Identifies impersonation attempts and known phishing patterns.',icon:'shield'},
  {name:'URL Scanning',description:'Checks links for suspicious or malicious destinations before access.',icon:'link'},
  {name:'Endpoint Security',description:'Helps detect and contain threats on devices used to access banking services.',icon:'device'},
  {name:'Access Controls',description:'Limits access to the accounts and resources each person needs.',icon:'lock'},
  {name:'Security Monitoring',description:'Observes security events to detect unusual activity and support investigation.',icon:'scan'},
 ]},
 {name:'HUMAN',headline:'People are part\nof the defence.',copy:'Awareness helps users recognize, verify and report suspicious activity.',controls:[
  {name:'Cybersecurity Training',description:'Builds practical knowledge of threats and safer everyday decisions.',icon:'people'},
  {name:'Phishing Simulations',description:'Provides safe practice recognizing deceptive messages before a real attack.',icon:'mail'},
  {name:'Verify Suspicious Emails',description:'Confirms unusual requests through a trusted, independently verified channel.',icon:'scan'},
  {name:'Report Suspicious Messages',description:'Gives the security team an early opportunity to investigate and respond.',icon:'flag'},
 ]},
 {name:'ORGANIZATIONAL',headline:'Protection needs\na system behind it.',copy:'Policies, response planning and regular assessment keep security consistent across the organization.',controls:[
  {name:'Security Policies',description:'Defines clear expectations, responsibilities and security practices.',icon:'policy'},
  {name:'Incident Response Plan',description:'Coordinates preparation, containment and recovery when an incident occurs.',icon:'shield'},
  {name:'Regular Risk Assessment',description:'Reviews changing threats, weaknesses and the effectiveness of controls.',icon:'scan'},
  {name:'Access Management',description:'Reviews and updates permissions as roles and responsibilities change.',icon:'lock'},
  {name:'Employee Awareness Programme',description:'Keeps security awareness active through regular communication and practice.',icon:'people'},
 ]},
] as const;
