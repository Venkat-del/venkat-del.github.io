list_charts={'Foundation Index':'FOUNDATION','Technology Performance':'FOUNDATION_01','Infrastructure Penetration':'FOUNDATION_02','Public Policy':'FOUNDATION_03','Flow Index':'FLOW','Virtual Flows':'FLOW_01','Physical Flows':'FLOW_02','Flow Amplifiers':'FLOW_03','Impact Index':'IMPACT','Markets':'IMPACT_01','Firms':'IMPACT_02','People':'IMPACT_03',
'Computing':'I1000','Computing (Raw)':'I1001','Digital Storage':'I2000','Digital Storage (Raw)':'I2001','Bandwidth':'I3000','Bandwidth (Raw)':'I3001','Internet Users':'I4000','Wireless Subscriptions':'I5000','Economic Freedom':'I6000','Business Freedom':'I6001','Trade Freedom ':'I6002','Fiscal Freedom':'I6003',
"Gov't Size":'I6004','Monetary Freedom':'I6005','Investment Freedom':'I6006','Financial Freedom':'I6007','Property Rights':'I6008','Freedom from Corruption ':'I6009','Labor Freedom':'I6010','Inter-Firm Knowledge Flows':'I7000','Wireless Minutes':'I8001','SMS Volume':'I8002','Internet Activity':'I9000','Migration of People to Creative Cities':'I10000',
'Migration to Top Ten Cities':'I10001','Migration to Bottom Ten Cities':'I10002','Travel Volume':'I11000','Movement of Capital':'I12000','Total FDI Flows':'I12001','FDI Inward':'I12002','FDI Outward':'I12003','GDP':'I12004','Worker Passion':'I13000','Social Media Activity':'I14000','Competitive Intensity':'I15000','Labor Productivity':'I16000',
'Stock Price Volatility':'I17000','Merger Activity':'I17001','Asset Profitability':'I18000','ROA Performance Gap':'I19000','ROA - Top Quartile':'I19041','ROA - Bottom Quartile':'I19082','Firm Topple Rate':'I20000','Shareholder Value Gap':'I21000','Shareholder Value - Top Quartile':'I21041','Shareholder Value - Bottom Quartile':'I21082','Consumer Power':'I22000','Brand Disloyalty':'I23000',
'Returns to Talent':'I24000','Total Compensation - Super-Creative Core':'I24001','Total Compensation - Creative':'I24002','Total Compensation - Working':'I24003','Total Compensation - Service':'I24004','Total Compensation - Agriculture':'I24005','Total Employment - Super-Creative Core':'I24006','Total Employment - Creative':'I24007','Total Employment - Working':'I24008','Total Employment - Service':'I24009','Total Employment - Agriculture':'I24010','Executive Turnover':'I25000'}

stacked = `<div class="stacked-chart-menu">
  <nav role="navigation" class="navbar navbar-default">
  <!-- Brand and toggle get grouped for better mobile display -->
  <!-- Collection of nav links and other content for toggling -->
  <div id="navbarCollapse-ch" class="collapse navbar-collapse">
<p >Outlines the complete shift index data</p>




  </div>
  </nav>
</div>
<div class="chart-wrapper">
<div class="chart-area col-lg-7 col-md-7">
  <div id="App1"><svg >

  </svg>
</div>


<div id="App"></div>
</div>
<div class="notes col-lg-4 col-md-4"></div>
</div>
`
foundation = `
<li class="dropdown"><a data-toggle="dropdown" class=
"dropdown-toggle" href="#"  >Technology Perfomance</a>
<ul role="menu" class="dropdown-menu multi-level">
<li class="dropdown-submenu">
  <a tabindex="-1" href="#" onclick="read_data('I1000',chart_type,start_year,trend)">Computing
  </a>
  <ul class="dropdown-menu">
                  <li><a tabindex="-1" href="#" onclick="read_data('I1001',chart_type,start_year,trend)"> Computing(Raw)</a></li>
                </ul>

</li>
<li class="dropdown-submenu"><a href="#" onclick="read_data('I2000',chart_type,start_year,trend)">Digital
Storage</a><ul class="dropdown-menu">
                <li><a tabindex="-1" href="#" onclick="read_data('I2001',chart_type,start_year,trend)">Digital
                Storage(Raw)</a></li>
              </ul></li>
<li class="dropdown-submenu"><a href="#" onclick="read_data('I3000',chart_type,start_year,trend)">Bandwidth</a><ul class="dropdown-menu">
                <li><a tabindex="-1" href="#" onclick="read_data('I3001',chart_type,start_year,trend)">Bandwidth(Raw)</a></li>
              </ul></li>
</ul>
</li>

<li class="dropdown"><a data-toggle="dropdown" class=
"dropdown-toggle" href="#">Public Policy</a>
<ul role="menu" class="dropdown-menu">
<li class="dropdown-submenu"><a href="#" onclick="read_data('I6000',chart_type,start_year,trend)">Economic
Freedom</a><ul class="dropdown-menu">
                <li><a tabindex="-1" href="#" onclick="read_data('I6001',chart_type,start_year,trend)">Business Freedom</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6002',chart_type,start_year,trend)">Trade Freedom</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6003',chart_type,start_year,trend)">Fiscal Freedom</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6004',chart_type,start_year,trend)">Gov't Size</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6005',chart_type,start_year,trend)">Monetary Freedom</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6006',chart_type,start_year,trend)">Investment Freedom</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6007',chart_type,start_year,trend)">Financial Freedom</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6008',chart_type,start_year,trend)">Property Rights</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6009',chart_type,start_year,trend)">Freedom from Corruption</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6010',chart_type,start_year,trend)">Labor Freedom</a></li>
              </ul></li>

</ul>
</li>
<li class="dropdown"><a data-toggle="dropdown" class=
"dropdown-toggle" href="#">Infrastructure Penetartion</a>
<ul role="menu" class="dropdown-menu">
<li><a href="#" onclick="read_data('I4000',chart_type,start_year,trend)">Internet
Users</a></li>
<li><a href="#" onclick="read_data('I5000',chart_type,start_year,trend)">Wireless
Subscriptions</a></li>

`
FOUNDATION = `
<li class="dropdown"><a data-toggle="dropdown" class=
"dropdown-toggle" href="#"  >Technology Perfomance</a>
<ul role="menu" class="dropdown-menu multi-level">
<li class="dropdown-submenu">
  <a tabindex="-1" href="#" onclick="read_data('I1000',chart_type,start_year,trend)">Computing
  </a>
  <ul class="dropdown-menu">
                  <li><a tabindex="-1" href="#" onclick="read_data('I1001',chart_type,start_year,trend)"> Computing(Raw)</a></li>
                </ul>

</li>
<li class="dropdown-submenu"><a href="#" onclick="read_data('I2000',chart_type,start_year,trend)">Digital
Storage</a><ul class="dropdown-menu">
                <li><a tabindex="-1" href="#" onclick="read_data('I2001',chart_type,start_year,trend)">Digital
                Storage(Raw)</a></li>
              </ul></li>
<li class="dropdown-submenu"><a href="#" onclick="read_data('I3000',chart_type,start_year,trend)">Bandwidth</a><ul class="dropdown-menu">
                <li><a tabindex="-1" href="#" onclick="read_data('I3001',chart_type,start_year,trend)">Bandwidth(Raw)</a></li>
              </ul></li>
</ul>
</li>

<li class="dropdown"><a data-toggle="dropdown" class=
"dropdown-toggle" href="#">Public Policy</a>
<ul role="menu" class="dropdown-menu">
<li class="dropdown-submenu"><a href="#" onclick="read_data('I6000',chart_type,start_year,trend)">Economic
Freedom</a><ul class="dropdown-menu">
                <li><a tabindex="-1" href="#" onclick="read_data('I6001',chart_type,start_year,trend)">Business Freedom</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6002',chart_type,start_year,trend)">Trade Freedom</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6003',chart_type,start_year,trend)">Fiscal Freedom</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6004',chart_type,start_year,trend)">Gov't Size</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6005',chart_type,start_year,trend)">Monetary Freedom</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6006',chart_type,start_year,trend)">Investment Freedom</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6007',chart_type,start_year,trend)">Financial Freedom</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6008',chart_type,start_year,trend)">Property Rights</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6009',chart_type,start_year,trend)">Freedom from Corruption</a></li>
                <li><a tabindex="-1" href="#" onclick="read_data('I6010',chart_type,start_year,trend)">Labor Freedom</a></li>
              </ul></li>

</ul>
</li>
<li class="dropdown"><a data-toggle="dropdown" class=
"dropdown-toggle" href="#">Infrastructure Penetartion</a>
<ul role="menu" class="dropdown-menu">
<li><a href="#" onclick="read_data('I4000',chart_type,start_year,trend)">Internet
Users</a></li>
<li><a href="#" onclick="read_data('I5000',chart_type,start_year,trend)">Wireless
Subscriptions</a></li>

`
FLOW = `
<li class="dropdown"><a data-toggle="dropdown" class=
"dropdown-toggle" href="#"  >Virtual Flows</a>
<ul role="menu" class="dropdown-menu multi-level">
<li class="dropdown-submenu">
  <a tabindex="-1" href="#" onclick="read_data('I7000',chart_type,start_year,trend)">Inter-Firm Knowledge Flows
  </a>
  <ul class="dropdown-menu">
                  <li><a tabindex="-1" href="#" onclick="read_data('I8001',chart_type,start_year,trend)"> Wireless Minutes</a></li>
<li><a tabindex="-1" href="#" onclick="read_data('I8002',chart_type,start_year,trend)"> SMS Volume</a></li>
                </ul>

</li>
<li><a href="#" onclick="read_data('I9000',chart_type,start_year,trend)">Internet Activity</a><ul class="dropdown-menu">

              </ul></li>

</ul>
</li>

<li class="dropdown"><a data-toggle="dropdown" class=
"dropdown-toggle" href="#">Physical Flows</a>
<ul role="menu" class="dropdown-menu">
<li class="dropdown-submenu">
  <a tabindex="-1" href="#" onclick="read_data('I10000',chart_type,start_year,trend)">Migration of People to Creative Cities
  </a>
  <ul class="dropdown-menu">
                  <li><a tabindex="-1" href="#" onclick="read_data('I10001',chart_type,start_year,trend)">Migration to Top Ten cities</a></li>
<li><a tabindex="-1" href="#" onclick="read_data('I10002',chart_type,start_year,trend)">Migration to Bottom Ten cities</a></li>
                </ul>

</li>
<li >
  <a tabindex="-1" href="#" onclick="read_data('I11000',chart_type,start_year,trend)">Travel Volume
  </a>

</li>
</ul>

</li>


</ul>
<ul role="menu" class="dropdown-menu">
<li class="dropdown-submenu">
  <a tabindex="-1" href="#" onclick="read_data('I12000',chart_type,start_year,trend)">Movement of capital
  </a>
  <ul class="dropdown-menu">
                  <li><a tabindex="-1" href="#" onclick="read_data('I20001',chart_type,start_year,trend)">Total FDI flows</a></li>
<li><a tabindex="-1" href="#" onclick="read_data('I20002',chart_type,start_year,trend)">FDI Inward</a></li>
<li><a tabindex="-1" href="#" onclick="read_data('I20003',chart_type,start_year,trend)">FDI Outward</a></li>
<li><a tabindex="-1" href="#" onclick="read_data('I20004',chart_type,start_year,trend)">GDP</a></li>
                </ul>

</li>

</ul>
</li>
<li class="dropdown"> <a data-toggle="dropdown" class=
"dropdown-toggle" href="#">Amplifiers</a>
<ul role="menu" class="dropdown-menu">
<li><a href="#" onclick="read_data('I3000',chart_type,start_year,trend)">Worker Passion</a></li>
<li><a href="#" onclick="read_data('I4000',chart_type,start_year,trend)">Social Media Activity</a></li>
</ul>
`


IMPACT = `
<li class="dropdown"><a data-toggle="dropdown" class=
"dropdown-toggle" href="#"  >Markets</a>
<ul role="menu" class="dropdown-menu multi-level">
<li >
  <a tabindex="-1" href="#" onclick="read_data('I15000',chart_type,start_year,trend)">Competitive Intensity
  </a>
  </li>
<li>
<a href="#" onclick="read_data('I16000',chart_type,start_year,trend)">Labor Productivity</a></li>
  <li class="dropdown-submenu">
    <a tabindex="-1" href="#" onclick="read_data('I17000',chart_type,start_year,trend)">Stock Price Volatality
    </a>
    <ul class="dropdown-menu">
                    <li><a tabindex="-1" href="#" onclick="read_data('I17001',chart_type,start_year,trend)">Merger Activity
  </a></li>
                  </ul>

  </li>

</ul>
</li>

<li class="dropdown"><a data-toggle="dropdown" class=
"dropdown-toggle" href="#">Firms</a>
<ul role="menu" class="dropdown-menu">
<li >
  <a tabindex="-1" href="#" onclick="read_data('I18000',chart_type,start_year,trend)">Asset Profitability
  </a>
  </li>
<li >
  <a tabindex="-1" href="#" onclick="read_data('I19000',chart_type,start_year,trend)">ROA Perfomance Gap
  </a>

</li>
<li >
  <a tabindex="-1" href="#" onclick="read_data('I19041',chart_type,start_year,trend)">ROA- Top Quartile
  </a>

</li>
<li >
  <a tabindex="-1" href="#" onclick="read_data('I19082',chart_type,start_year,trend)">ROA-Bottom Quartile
  </a>

</li>

<li >
  <a tabindex="-1" href="#" onclick="read_data('I20000',chart_type,start_year,trend)">Firm Topple Rate
  </a>

</li>
<li class="dropdown-submenu">
  <a tabindex="-1" href="#" onclick="read_data('I21000',chart_type,start_year,trend)">Share Holder Value Gap
  </a>
  <ul class="dropdown-menu">
                  <li><a tabindex="-1" href="#" onclick="read_data('I21041',chart_type,start_year,trend)">Top Quartile</a></li>
<li><a tabindex="-1" href="#" onclick="read_data('I21082',chart_type,start_year,trend)">Bottom Quartile</a></li>
                </ul>

</li>
</ul>

</li>


</ul>
<ul role="menu" class="dropdown-menu">
<li class="dropdown-submenu">
  <a tabindex="-1" href="#" onclick="read_data('I12000',chart_type,start_year,trend)">Movement of capital
  </a>
  <ul class="dropdown-menu">
                  <li><a tabindex="-1" href="#" onclick="read_data('I20001',chart_type,start_year,trend)">Total FDI flows</a></li>
<li><a tabindex="-1" href="#" onclick="read_data('I20002',chart_type,start_year,trend)">FDI Inward</a></li>
<li><a tabindex="-1" href="#" onclick="read_data('I20003',chart_type,start_year,trend)">FDI Outward</a></li>
<li><a tabindex="-1" href="#" onclick="read_data('I20004',chart_type,start_year,trend)">GDP</a></li>
                </ul>

</li>

</ul>
</li>
<li class="dropdown"> <a data-toggle="dropdown" class=
"dropdown-toggle" href="#">People</a>
<ul role="menu" class="dropdown-menu">
<li><a href="#" onclick="read_data('I22000',chart_type,start_year,trend)">Consumer Power </a></li>
<li><a href="#" onclick="read_data('I23000',chart_type,start_year,trend)">Brand Disloyality</a></li>
<li><a href="#" onclick="read_data('I24000',chart_type,start_year,trend)">Returns to talent</a></li>

<li><a href="#" onclick="read_data('I25000',chart_type,start_year,trend)">Executive Turnover</a></li>

</ul>
`

comparison1 = `
<li class="dropdown "><a data-toggle="dropdown" class=
"dropdown-toggle btn dropdown-toggle btn-default" href="#" id="chl-lab" >Foundation Index</a>
<ul role="menu" class="dropdown-menu multi-level">

<li class="dropdown-submenu">
  <a href="#" value = 'FOUNDATION' onclick="load_compl_chart(this.text)">Foundation Index</a>
  <ul class="dropdown-menu">
      <li class="dropdown-submenu">
        <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Technology Performance</a>
        <ul class="dropdown-menu">
            <li class="dropdown-submenu ">
              <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Computing</a>
              <ul class="dropdown-menu">
                  <li>
                    <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Computing (Raw)</a>

                  </li>
              </ul>
            </li>
            <li class="dropdown-submenu ">
              <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Digital Storage</a>
              <ul class="dropdown-menu">
                  <li >
                    <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Digital Storage (Raw)</a>

                  </li>
              </ul>
            </li>
            <li class="dropdown-submenu ">
              <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Bandwidth</a>
              <ul class="dropdown-menu">
                  <li >
                    <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Bandwidth (Raw)</a>

                  </li>
              </ul>
            </li>
        </ul>

      </li>
      <li class="dropdown-submenu">
        <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Infrastructure Penetration</a>
        <ul class="dropdown-menu">
            <li >
              <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Internet Users</a>
            </li>
            <li>
              <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Wireless Subscriptions</a>
            </li>
        </ul>

      </li>

      <li class="dropdown-submenu"><a  href="#" onclick="load_compl_chart(this.text)">Public Policy</a>
      <ul class="dropdown-menu">
      <li class="dropdown-submenu "><a href="#" onclick="load_compl_chart(this.text)">Economic Freedom</a>
      <ul class="dropdown-menu">
                      <li><a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Business Freedom</a></li>
                      <li><a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Trade Freedom</a></li>
                      <li><a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Fiscal Freedom</a></li>
                      <li><a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Gov't Size</a></li>
                      <li><a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Monetary Freedom</a></li>
                      <li><a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Investment Freedom</a></li>
                      <li><a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Financial Freedom</a></li>
                      <li><a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Property Rights</a></li>
                      <li><a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Freedom from Corruption</a></li>
                      <li><a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Labor Freedom</a></li>
                    </ul></li>

      </ul>
      </li>


  </ul>
</li>

<li class="dropdown-submenu">
  <a href="#" onclick="load_compl_chart(this.text)">Flow Index</a>
  <ul class="dropdown-menu">
      <li class="dropdown-submenu">
        <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Virtual Flows</a>
        <ul class="dropdown-menu">
            <li class="dropdown-submenu ">
              <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Inter-Firm Knowledge Flows</a>
              <ul class="dropdown-menu">
                  <li>
                    <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Wireless Minutes</a>

                  </li>
                  <li>
                    <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">SMS Volume</a>

                  </li>
              </ul>
            </li>
            <li >
              <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Internet Activity</a>

            </li>

        </ul>

      </li>
      <li class="dropdown-submenu">
        <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Physical Flows</a>
        <ul class="dropdown-menu">
        <li class="dropdown-submenu ">
          <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Migration of people to Creative Cities</a>
          <ul class="dropdown-menu">
              <li>
                <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Migration of people to Top Ten Cities</a>

              </li>
              <li>
                <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Migration of people to Bottom Ten Cities</a>

              </li>
          </ul>
        </li>
            <li>
              <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Travel Volume</a>
            </li>
            <li class="dropdown-submenu ">
              <a tabindex="-1" href="#"  onclick="load_compl_chart(this.text)">Movement of capital</a>
              <ul class="dropdown-menu">
                              <li><a tabindex="-1" href="#"  onclick="load_compl_chart(this.text)">Total FDI flows</a></li>
            <li><a tabindex="-1" href="#"  onclick="load_compl_chart(this.text)">FDI Inward</a></li>
            <li><a tabindex="-1" href="#"  onclick="load_compl_chart(this.text))">FDI Outward</a></li>
            <li><a tabindex="-1" href="#"  onclick="load_compl_chart(this.text)">GDP</a></li>
                            </ul>

            </li>

        </ul>

      </li>
      <li class="dropdown-submenu"> <a href="#" onclick="load_compl_chart(this.text)">Amplifiers</a>
      <ul role="menu" class="dropdown-menu">
      <li><a href="#"  onclick="load_compl_chart(this.text)">Worker Passion</a></li>
      <li><a href="#"  onclick="load_compl_chart(this.text)">Social Media Activity</a></li>
      </ul>
      </li>

      </ul>
      </li>

      <li class="dropdown-submenu"><a onclick="load_compl_chart(this.text)" href="#">Impact Index</a>

      <ul class="dropdown-menu">


        <li class="dropdown-submenu"><a href="#"  onclick="load_compl_chart(this.text)">Markets</a>
          <ul  class="dropdown-menu">
          <li >
            <a tabindex="-1" href="#"  onclick="load_compl_chart(this.text)">Competitive Intensity</a>
          </li>
          <li><a href="#"  onclick="load_compl_chart(this.text)">Labor Productivity</a>
          </li>
        <li class="dropdown-submenu ">
          <a tabindex="-1" href="#"  onclick="load_compl_chart(this.text)">Stock Price Volatality</a>
          <ul class="dropdown-menu">
                          <li><a tabindex="-1" href="#"  onclick="load_compl_chart(this.text)">Merger Activity</a></li>
                        </ul>

        </li>

      </ul>
      </li>

      <li class="dropdown-submenu"><a  onclick="load_compl_chart(this.text)" href="#">Firms</a>
      <ul  class="dropdown-menu">
      <li >
        <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Asset Profitability</a>
        </li>
      <li >
        <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">ROA Performance Gap</a>

      </li>
      <li >
        <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">ROA - Top Quartile</a>

      </li>
      <li >
        <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">ROA - Bottom Quartile</a>

      </li>

      <li >
        <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Firm Topple Rate</a>

      </li>
      <li class="dropdown-submenu ">
        <a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Share Holder Value Gap</a>
        <ul class="dropdown-menu">
                        <li><a tabindex="-1" href="#" onclick="load_compl_chart(this.text)">Top Quartile</a></li>
      <li><a tabindex="-1" href="#" onclick=load_compl_chart(this.text)">Bottom Quartile</a></li>
                      </ul>

      </li>
      </ul>
      </li>
      <li class="dropdown-submenu"> <a onclick="load_compl_chart(this.text)">People</a>
      <ul class="dropdown-menu">
      <li><a href="#" onclick="load_compl_chart(this.text)">Consumer Power </a></li>
      <li><a href="#" onclick="load_compl_chart(this.text)">Brand Disloyality</a></li>
      <li><a href="#" onclick="load_compl_chart(this.text)">Returns to talent</a></li>

      <li><a href="#" onclick="load_compl_chart(this.text)">Executive Turnover</a></li>

      </ul>
      </li>
      </ul>

      </li>

</ul>
</li>

    `

    comparison2 = `
    <li class="dropdown "><a data-toggle="dropdown" class=
    "dropdown-toggle btn dropdown-toggle btn-default" href="#" id="chr-lab" >Flow Index</a>
    <ul role="menu" class="dropdown-menu multi-level">

    <li class="dropdown-submenu ">
      <a href="#" value = 'FOUNDATION' onclick="load_compr_chart(this.text)">Foundation Index</a>
      <ul class="dropdown-menu">
          <li class="dropdown-submenu ">
            <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Technology Performance</a>
            <ul class="dropdown-menu">
                <li class="dropdown-submenu ">
                  <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Computing</a>
                  <ul class="dropdown-menu">
                      <li>
                        <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Computing (Raw)</a>

                      </li>
                  </ul>
                </li>
                <li class="dropdown-submenu">
                  <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Digital Storage</a>
                  <ul class="dropdown-menu">
                      <li >
                        <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Digital Storage (Raw)</a>

                      </li>
                  </ul>
                </li>
                <li class="dropdown-submenu">
                  <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Bandwidth</a>
                  <ul class="dropdown-menu">
                      <li >
                        <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Bandwidth (Raw)</a>

                      </li>
                  </ul>
                </li>
            </ul>

          </li>
          <li class="dropdown-submenu">
            <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Infrastructure Penetration</a>
            <ul class="dropdown-menu">
                <li >
                  <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Internet Users</a>
                </li>
                <li>
                  <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Wireless Subscriptions</a>
                </li>
            </ul>

          </li>

          <li class="dropdown-submenu"><a  href="#" onclick="load_compr_chart(this.text)">Public Policy</a>
          <ul class="dropdown-menu">
          <li class="dropdown-submenu"><a href="#" onclick="load_compr_chart(this.text)">Economic Freedom</a>
          <ul class="dropdown-menu">
                          <li><a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Business Freedom</a></li>
                          <li><a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Trade Freedom</a></li>
                          <li><a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Fiscal Freedom</a></li>
                          <li><a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Gov't Size</a></li>
                          <li><a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Monetary Freedom</a></li>
                          <li><a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Investment Freedom</a></li>
                          <li><a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Financial Freedom</a></li>
                          <li><a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Property Rights</a></li>
                          <li><a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Freedom from Corruption</a></li>
                          <li><a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Labor Freedom</a></li>
                        </ul></li>

          </ul>
          </li>


      </ul>
    </li>

    <li class="dropdown-submenu">
      <a href="#" onclick="load_compr_chart(this.text)">Flow Index</a>
      <ul class="dropdown-menu">
          <li class="dropdown-submenu">
            <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Virtual Flows</a>
            <ul class="dropdown-menu">
                <li class="dropdown-submenu">
                  <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Inter-Firm Knowledge Flows</a>
                  <ul class="dropdown-menu">
                      <li>
                        <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Wireless Minutes</a>

                      </li>
                      <li>
                        <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">SMS Volume</a>

                      </li>
                  </ul>
                </li>
                <li >
                  <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Internet Activity</a>

                </li>

            </ul>

          </li>
          <li class="dropdown-submenu">
            <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Physical Flows</a>
            <ul class="dropdown-menu">
            <li class="dropdown-submenu">
              <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Migration of people to Creative Cities</a>
              <ul class="dropdown-menu">
                  <li>
                    <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Migration of people to Top Ten Cities</a>

                  </li>
                  <li>
                    <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Migration of people to Bottom Ten Cities</a>

                  </li>
              </ul>
            </li>
                <li>
                  <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Travel Volume</a>
                </li>
                <li class="dropdown-submenu">
                  <a tabindex="-1" href="#"  onclick="load_compr_chart(this.text)">Movement of capital</a>
                  <ul class="dropdown-menu">
                                  <li><a tabindex="-1" href="#"  onclick="load_compr_chart(this.text)">Total FDI flows</a></li>
                <li><a tabindex="-1" href="#"  onclick="load_compr_chart(this.text)">FDI Inward</a></li>
                <li><a tabindex="-1" href="#"  onclick="load_compr_chart(this.text))">FDI Outward</a></li>
                <li><a tabindex="-1" href="#"  onclick="load_compr_chart(this.text)">GDP</a></li>
                                </ul>

                </li>

            </ul>

          </li>
          <li class="dropdown-submenu"> <a href="#" onclick="load_compr_chart(this.text)">Amplifiers</a>
          <ul role="menu" class="dropdown-menu">
          <li><a href="#"  onclick="load_compr_chart(this.text)">Worker Passion</a></li>
          <li><a href="#"  onclick="load_compr_chart(this.text)">Social Media Activity</a></li>
          </ul>
          </li>

          </ul>
          </li>

          <li class="dropdown-submenu"><a onclick="load_compr_chart(this.text)" href="#">Impact Index</a>

          <ul class="dropdown-menu">


            <li class="dropdown-submenu"><a href="#"  onclick="load_compr_chart(this.text)">Markets</a>
              <ul  class="dropdown-menu">
              <li >
                <a tabindex="-1" href="#"  onclick="load_compr_chart(this.text)">Competitive Intensity</a>
              </li>
              <li><a href="#"  onclick="load_compr_chart(this.text)">Labor Productivity</a>
              </li>
            <li class="dropdown-submenu">
              <a tabindex="-1" href="#"  onclick="load_compr_chart(this.text)">Stock Price Volatality</a>
              <ul class="dropdown-menu">
                              <li><a tabindex="-1" href="#"  onclick="load_compr_chart(this.text)">Merger Activity</a></li>
                            </ul>

            </li>

          </ul>
          </li>

          <li class="dropdown-submenu"><a  onclick="load_compr_chart(this.text)" href="#">Firms</a>
          <ul  class="dropdown-menu">
          <li >
            <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Asset Profitability</a>
            </li>
          <li >
            <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">ROA Performance Gap</a>

          </li>
          <li >
            <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">ROA - Top Quartile</a>

          </li>
          <li >
            <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">ROA - Bottom Quartile</a>

          </li>

          <li >
            <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Firm Topple Rate</a>

          </li>
          <li class="dropdown-submenu">
            <a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Share Holder Value Gap</a>
            <ul class="dropdown-menu">
                            <li><a tabindex="-1" href="#" onclick="load_compr_chart(this.text)">Top Quartile</a></li>
          <li><a tabindex="-1" href="#" onclick=load_compr_chart(this.text)">Bottom Quartile</a></li>
                          </ul>

          </li>
          </ul>
          </li>
          <li class="dropdown-submenu  "> <a onclick="load_compr_chart(this.text)">People</a>
          <ul class="dropdown-menu  ">
          <li><a href="#" onclick="load_compr_chart(this.text)">Consumer Power </a></li>
          <li><a href="#" onclick="load_compr_chart(this.text)">Brand Disloyality</a></li>
          <li><a href="#" onclick="load_compr_chart(this.text)">Returns to talent</a></li>

          <li><a href="#" onclick="load_compr_chart(this.text)">Executive Turnover</a></li>

          </ul>
          </li>
          </ul>

          </li>

    </ul>
    </li>

        `

home =`<h1> Shift Index Analytics Platform</h1>
<ol>
<li>
<p> This workbook contains underlying indicator data for the Shift Index and allows the user  to  view the charts and download them
</p>
</li>
<li>
<p> The entire dashboard is categorized into three main groups
    <ol>
    <li>  Shift Index Overview: Presents the higher level representation of the index values for all the categories</li>
    <li>  Individual Metrics: Users can browse through the individual metrics which are preloaded</li>
    <li>  Comparison charts: Provides the option to compare between any two metrics</li>
    </ol>
    </p>
    </li>
    </br>
    <li>
The dashboard provides the user with the option of selecting the type and the start year for the time series as well
</li>
</br>
<li>
Users are provides with the option of downloading the data along the snapshot of the chart
</li>
</br>
<li>
Trend line option is provided for the individual charts
</li>
</br>
<li>
We are open for the suggestions, please free to add them using our feedback button
</li>
</ol>
`
