figure8 = {
	title:'Figure 8. Flow Index (1993–2015)',
	subtitle:`<p>The Flow Index measures key performance drivers–flows of knowledge, capital, and talent–unleashed by the forces measured in the Foundation Index. These flows are enabled by the rapidly advancing digital infrastructure and the general trend toward policy liberalization. Worker passion and social media activities amplify the flows.</p>
<p>In the Big Shift, stocks of knowledge are less valuable, and participating in and harnessing knowledge flows becomes more important.</p>`,
	data:[
		{'Year':1993,'Index value':47.29},
		{'Year':1994,'Index value':48.88},
		{'Year':1995,'Index value':51.14},
		{'Year':1996,'Index value':53.65},
		{'Year':1997,'Index value':56.90},
		{'Year':1998,'Index value':60.34},
		{'Year':1999,'Index value':64.63},
		{'Year':2000,'Index value':71.82},
		{'Year':2001,'Index value':76.76},
		{'Year':2002,'Index value':82.70},
		{'Year':2003,'Index value':88.99},
		{'Year':2004,'Index value':96.85},
		{'Year':2005,'Index value':104.40},
		{'Year':2006,'Index value':116.14},
		{'Year':2007,'Index value':127.52},
		{'Year':2008,'Index value':139.09},
		{'Year':2009,'Index value':145.45},
		{'Year':2010,'Index value':154.97},
		{'Year':2011,'Index value':157.90},
		{'Year':2012,'Index value':151.77},
		{'Year':2013,'Index value':164.56},
		{'Year':2014,'Index value':166.21},
		{'Year':2015,'Index value':176.36}
	],
	config:{
		x:'Year',
		y:'Index value',
		showTrendline:false,
		legend:{
			'Index value':'#00B5AF'
		},
		yLog:false,
		yLimit:false,
		yFormat:'',
		yRange:[0,200],
		yExplicitlabels:[ 0,20,40,60,80,100,120,140,160,180,200],
	},
	type:'bar:single',
	source:'Deloitte analysis.'
}
