figure4 = {
	title:'Figure 4. Bandwidth cost/performance (1999–2015)',
	subtitle:`<p>The cost of Internet bandwidth has decreased, from $1,197 per 1000 megabytes per second (Mbps) in 1999 to $11 per 1000 Mbps in 2015. Declining cost/performance of bandwidth enables faster collection and transfer of data, facilitating richer connections and interactions.</p>`,
	data:[
		{'Year':1999,'$ per 1,000 Mbps':1197,marker:true},
		{'Year':2000,'$ per 1,000 Mbps':720},
		{'Year':2001,'$ per 1,000 Mbps':576},
		{'Year':2002,'$ per 1,000 Mbps':432},
		{'Year':2003,'$ per 1,000 Mbps':360},
		{'Year':2004,'$ per 1,000 Mbps':288},
		{'Year':2005,'$ per 1,000 Mbps':240},
		{'Year':2006,'$ per 1,000 Mbps':192},
		{'Year':2007,'$ per 1,000 Mbps':153.6},
		{'Year':2008,'$ per 1,000 Mbps':129.6},
		{'Year':2009,'$ per 1,000 Mbps':90},
		{'Year':2010,'$ per 1,000 Mbps':47.04},
		{'Year':2011,'$ per 1,000 Mbps':31.68},
		{'Year':2012,'$ per 1,000 Mbps':22.56,marker:true},
		{'Year':2013,'$ per 1,000 Mbps':16.32},
		{'Year':2014,'$ per 1,000 Mbps':13.44},
		{'Year':2015,'$ per 1,000 Mbps':11.04,marker:true}
	],
	config:{
		x:'Year',
		y:'$ per 1,000 Mbps',
		legend:{
			'$ per 1,000 Mbps':'#2CB34A'
		},
		yLog:true,
		yLimit:false,
		yFormat:'$',
		yLabel:' ',
		yComma:true,
		yRange:[1,10000],
		yExplicitlabels:[ 1, 10, 100, 1000, 10000],
	},
	legendComponent:[
		{'name':'$ per 1,000 Mbps','color':'#2CB34A','shape':'block'}
	],
	type:'line:single',
	source:'Leading technology research vendor.'
}
