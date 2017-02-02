figure5 = {
	title:'Figure 5. Internet users (1990–2015)',
	subtitle:`<p>Internet penetration in the United States is leveling off. In the 25 years since its inception, the percentage of the US population accessing the Internet each month has reached just over 72 percent, due in part to cheaper bandwidth and more robust connectivity. Widespread use of the Internet enables greater sharing of information and resources and broader access to markets.</p>`,
	data:[
		{'Year':1990,'% of US population accessing the Internet':0.64},
		{'Year':1991,'% of US population accessing the Internet':0.95},
		{'Year':1992,'% of US population accessing the Internet':1.41},
		{'Year':1993,'% of US population accessing the Internet':1.86},
		{'Year':1994,'% of US population accessing the Internet':3.98},
		{'Year':1995,'% of US population accessing the Internet':7.59},
		{'Year':1996,'% of US population accessing the Internet':13.53},
		{'Year':1997,'% of US population accessing the Internet':17.87},
		{'Year':1998,'% of US population accessing the Internet':24.96},
		{'Year':1999,'% of US population accessing the Internet':29.83},
		{'Year':2000,'% of US population accessing the Internet':35.05},
		{'Year':2001,'% of US population accessing the Internet':39.95},
		{'Year':2002,'% of US population accessing the Internet':44.05},
		{'Year':2003,'% of US population accessing the Internet':44.39},
		{'Year':2004,'% of US population accessing the Internet':50.33},
		{'Year':2005,'% of US population accessing the Internet':53.32},
		{'Year':2006,'% of US population accessing the Internet':58.31},
		{'Year':2007,'% of US population accessing the Internet':60.88},
		{'Year':2008,'% of US population accessing the Internet':62.67},
		{'Year':2009,'% of US population accessing the Internet':67.00},
		{'Year':2010,'% of US population accessing the Internet':68.55},
		{'Year':2011,'% of US population accessing the Internet':70.75},
		{'Year':2012,'% of US population accessing the Internet':70.56,marker:true},
		{'Year':2013,'% of US population accessing the Internet':70.81},
		{'Year':2014,'% of US population accessing the Internet':71.63},
		{'Year':2015,'% of US population accessing the Internet':72.24,marker:true}
	],
	config:{
		x:'Year',
		y:'% of US population accessing the Internet',
		legend:{
			'% of US population accessing the Internet':'#00B5AF'
		},
		yLog:false,
		yLimit:false,
		yFormat:'%',
		yRange:[0,80],
		xInterval:5,
	},
	legendComponent:[
		{'name':'% of US population accessing the Internet','color':'#00B5AF','shape':'block'}
	],
	type:'line:single',
	source:'comScore, Deloitte analysis.'
}
