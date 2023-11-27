<template>
  <div>
    <v-card-title>
      Monitoring
    </v-card-title>

    <v-card-text>
      This section of the web application enables insight into groundwater monitoring locations and the collected monitoring results. 
      The principal objective is to understand the phreatic (shallow) groundwater fluctuation in urban New Orleans.
    </v-card-text>

    <v-sheet class="pa-5">
      <v-dialog max-width="900" v-model="dialog" scrollable>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">Read more</v-btn>
        </template>
        
        <template v-slot:default="{ isActive }">
          <v-card title="Dialog">
            <v-card-title>
              Groundwater monitoring New Orleans
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text style="height: 900px;">
              <br>
              <p>This section of the web application provides insight into the groundwater monitoring locations and the collected monitoring results.</p>
              <p>Each measurement site contains information regarding the observed groundwater levels, as well as borehole geology descriptions and the results of sampling and field measurements.</p>
              <p><strong>The principal objective</strong> is to understand the phreatic (shallow) groundwater fluctuation in urban New Orleans.</p>
              <p><strong>Relevant sub questions are:</strong> How is this fluctuation related to actual climate conditions, sea and river levels, subsurface geology and the underground infrastructure? What is the relation to climate change and sea level rise? How can groundwater levels be raised to reduce subsidence?</p>
              <p><strong>The web viewer</strong> is also intended to support the development of adaptation measures to neutralize expected groundwater related flooding and drought in the future.</p>
              
              <h3 class="monitoring-header">Background</h3>
              <p>Little is known about shallow urban groundwater in New Orleans. Groundwater in New Orleans is recharged by (1) precipitation surplus (rain minus evaporation), (2) the infiltrating Mississippi river (mainly fresh water), (3) the infiltrating Lake Pontchartrain and the connected canals (mainly brackish – salt water) and (4) lost drinking water during transport.</p>
              <p>Existing groundwater levels will change by climate change, rising sea level and by renovations of underground infrastructure.</p>
              <p>In this, the role of shallow groundwater is still unclear. Therefore, a better understanding of the actual groundwater system and its changing conditions need to be understood.</p>
              
              <h3 class="monitoring-header">Explain groundwater fluctuation & storage.</h3>
              
              <p>We are monitoring the water table (top of saturated zone). In this zone all voids are filled with water. In this zone, water is held at a pressure greater than the atmospheric pressure, and hence it moves in a direction based on the contiguous hydraulic situation.</p>

              <p>The unsaturated zone can be further sub-divided into 'soilwater zone' and 'intermediate zone' (Todd, 1980). The zone between the ground surface and the top of water table is known as the vadose zone. Thus, the vadose zone consists of unsaturated zone and capillary zone (also known as ‘capillary fringe’). The water present in the vadose zone is called vadose water which is held at a pressure less than the atmospheric pressure.</p>
              
              <p>Remarks:</p>
              <ul>
                <li>In clay soils the specific storage is relatively small. Therefore, groundwater levels drop fast during evaporation periods, and rise fast during precipitation surplus periods</li>
                <li>In sand soils with a deeper groundwater level the specific storage is large. Therefore, the reaction on precipitation or evaporation is smaller and less dynamic</li>
              </ul>

              <br>

              <figure>
                <img src="@/assets/img/Earth111Mod6AFig2left.png">
                <figcaption class="monitoring-caption">
                  Figure 2 Schematic diagram showing a vertical section from the land surface through the vadose zone, capillary fringe, and into an unconfined aquifer. Source: From W.M. Alley et al., 1999, <a href="https://pubs.usgs.gov/circ/circ1186/index.html" target="_blank">USGS Circular 1186: Sustainability of Ground Water Resources</a>
                </figcaption>
              </figure>
              
              <h3 class="monitoring-header">Installation and measurements</h3>
              <p>Installation of shallow groundwater monitoring sites is done manually with hand augers. During installation a description of the subsurface is set up using standard descriptions that give information in soiltype, color and the amount of oxidiation. These standardized descriptions give useful insight in the subsurface system.</p>
              <img src="@/assets/img/hand_auger.png">
              <br><br>

              <p>To be able to measure the level of groundwater it is necessary to install a permeable screen, otherwise there is a closed tube. In the image below you see an example.</p>

              <img src="@/assets/img/screens.png">

              <p>Groundwater measurements are measured in two way's:</p>
              <ol>
                <li>
                  Electronic sensors that store hourly data in a storing device and  can be collected during field visit
                </li>

                <li>
                  Manual by a measurement  lint (the orange cylindrical device)
                </li>
              </ol>
              
              <br>
              <img src="@/assets/img/sensor_hand.png">
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn color="primary" block @click="dialog = false">
                Close Dialog
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  }
};
</script>

<style>
  .monitoring-header {
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }

  .monitoring-caption {
    font-style: italic;
  }
</style>