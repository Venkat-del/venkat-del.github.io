dummy= {
	title:'Figure 1. Foundation Index  (1993–2015)',
	subtitle:`<p>The Foundation Index measures changes that are fundamental to the business landscape, including advances in technology performance, rates of infrastructure penetration, and trends toward liberalization in public policies. </p>
<p>The cost/performance of the core digital technology building blocks has been improving exponentially for decades and at a faster rate than that of previous technologies. As a result, increasingly powerful and affordable mobile devices, combined with robust connectivity, enable individuals and institutions to more easily connect and communicate. At the same time, these core digital components combine in innovative ways to create new tools, including powerful cloud capabilities, that enable new business models and ways of working.  Public policies that reduce barriers to the movement of people, resources, and capital tend to reinforce the changes catalyzed by the digital infrastructure.</p>
<p>The metrics in the Foundation Index provide leading indicators for potential change in other areas.</p>
`,
	data:[
		{'Year': 1993, 'Foundation Index':37.68},
		{'Year': 1994, 'Foundation Index':41.33},
		{'Year': 1995, 'Foundation Index':45.97},
		{'Year': 1996, 'Foundation Index':50.28},
		{'Year': 1997, 'Foundation Index':54.17},
		{'Year': 1998, 'Foundation Index':59.11},
		{'Year': 1999, 'Foundation Index':64.34},
		{'Year': 2000, 'Foundation Index':73.62},
		{'Year': 2001, 'Foundation Index':83.04},
		{'Year': 2002, 'Foundation Index':92.12},
		{'Year': 2003, 'Foundation Index':100.00},
		{'Year': 2004, 'Foundation Index':110.49},
		{'Year': 2005, 'Foundation Index':121.02},
		{'Year': 2006, 'Foundation Index':132.43},
		{'Year': 2007, 'Foundation Index':142.85},
		{'Year': 2008, 'Foundation Index':152.82},
		{'Year': 2009, 'Foundation Index':168.14},
		{'Year': 2010, 'Foundation Index':189.91},
		{'Year': 2011, 'Foundation Index':207.51},
		{'Year': 2012, 'Foundation Index':226.26},
		{'Year': 2013, 'Foundation Index':242.47},
		{'Year': 2014, 'Foundation Index':253.46},
		{'Year': 2015, 'Foundation Index':269.26}
	],
	config:{
		x:'Year',
		y:'Foundation Index',
		legend:{
			'Foundation Index':'#00B5AF'
		},
		yLabel:'Index value',
		yLog:false,
		yLimit:false,
		yFormat:'',
		yRange:[0,300],
		yExplicitlabels:[ 0,50,100,150,200,250,300],
		xRaise:0,
	},
	type:'bar:single',
	source:'Deloitte analysis.'
}
