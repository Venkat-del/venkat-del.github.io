figure3 = {
	title:'Figure 3. Storage cost/performance (1992–2015)',
	subtitle:`<p>The cost of data storage trends downward, decreasing from $569 per 1 gigabyte of storage in 1992 to $0.02 per 1 gigabyte in 2015. The decreasing cost/performance of digital storage enables the creation of more, and richer, digital information, accessible to more people.</p>`,
	data:[
		{'Year':1992,'$ per gigabyte (GB)':568.86,marker:true},
		{'Year':1993,'$ per gigabyte (GB)':313.5},
		{'Year':1994,'$ per gigabyte (GB)':172.425},
		{'Year':1995,'$ per gigabyte (GB)':94.8366},
		{'Year':1996,'$ per gigabyte (GB)':52.1607},
		{'Year':1997,'$ per gigabyte (GB)':28.6881},
		{'Year':1998,'$ per gigabyte (GB)':15.7776},
		{'Year':1999,'$ per gigabyte (GB)':8.6754},
		{'Year':2000,'$ per gigabyte (GB)':4.7709},
		{'Year':2001,'$ per gigabyte (GB)':2.6277},
		{'Year':2002,'$ per gigabyte (GB)':1.4421},
		{'Year':2003,'$ per gigabyte (GB)':0.9614},
		{'Year':2004,'$ per gigabyte (GB)':0.640933333},
		{'Year':2005,'$ per gigabyte (GB)':0.427288889},
		{'Year':2006,'$ per gigabyte (GB)':0.284859259},
		{'Year':2007,'$ per gigabyte (GB)':0.189906173},
		{'Year':2008,'$ per gigabyte (GB)':0.126604115},
		{'Year':2009,'$ per gigabyte (GB)':0.08},
		{'Year':2010,'$ per gigabyte (GB)':0.055148753},
		{'Year':2011,'$ per gigabyte (GB)':0.039943},
		{'Year':2012,'$ per gigabyte (GB)':0.028518,marker:true},
		{'Year':2013,'$ per gigabyte (GB)':0.024684882},
		{'Year':2014,'$ per gigabyte (GB)':0.019825032},
		{'Year':2015,'$ per gigabyte (GB)':0.016388804,marker:true}
	],
	config:{
		x:'Year',
		y:'$ per gigabyte (GB)',
		legend:{
			'$ per gigabyte (GB)':'#00AAE7'
		},
		yLog:true,
		yLimit:false,
		yFormat:'$',
		yComma:true,
		xRaise:1,
		yRange:[0.01,1000],
		yExplicitlabels:[0.01, 0.1, 1, 10, 100, 1000],
	},
	legendComponent:[
		{'name':'$ per gigabyte (GB)','color':'#00AAE7','shape':'block'}
	],
	type:'line:single',
	source:'Leading technology research vendor.'
}
