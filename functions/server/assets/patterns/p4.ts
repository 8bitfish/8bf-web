import { Shades } from "../../../../global";

export default function pattern_4({ primary, secondary }: Shades): string {
  const p = `<svg xmlns="http://www.w3.org/2000/svg"  width="350" height="350" viewBox="0 0 350 350">
  <defs>
    <linearGradient id="linear-gradient" x2="1" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="${primary.bg}"/>
      <stop offset="1" stop-color="${secondary.bg}"/>
    </linearGradient>
  </defs>
  <g id="Group_200" data-name="Group 200" transform="translate(6684 -382)">
    <rect id="Rectangle_819" data-name="Rectangle 819" width="350" height="350" transform="translate(-6684 382)" fill="url(#linear-gradient)"/>
    <g id="Group_180" data-name="Group 180" transform="translate(-112.285 -11)">
      <g id="Group_178" data-name="Group 178" transform="translate(-12281.82 309.725)">
        <path id="Union_21" data-name="Union 21" d="M59.393,141.158H-11V118.539H37.715V102.883H59.393v20.633H77.085v17.642Zm37.379-17.642H77.085V100.561H91.463V88.223H92.79V68.591h19.687v54.925ZM41.7,35.288h-23V17.646H24V0h35.4V35.288Z" transform="translate(5905.058 187.275)" fill="${secondary.dark}" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
        <path id="Union_24" data-name="Union 24" d="M88.473,23.582H35.388V20.614H0V0H129.838V20.614H106.169v2.968Z" transform="translate(5840.584 272.53)" fill="${primary.maxDark}" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
        <path id="Union_20" data-name="Union 20" d="M35.388,92.873H-6V75.227H53.085V92.873ZM94.113,75.227H70.781V55.257H85.819V15.988h15.374V0h22.673V39.938h-17.7V75.227Z" transform="translate(5893.669 217.918)" fill="${secondary.base}" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
        <path id="Union_19" data-name="Union 19" d="M17.7,141.157V123.516H0V105.869H17.7v17.647H35.388v17.641Zm85.819-88.223V35.288h2.654V17.646h35.393V35.288h-17.7V52.934ZM35.388,35.288H17.7V17.646H53.084V35.288Zm17.7-17.642V0h17.7V17.646Z" transform="translate(5875.973 187.275)" fill="${secondary.light}" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
        <path id="Union_22" data-name="Union 22" d="M183.918,52.934V35.293h0V52.934h-19.7V40.155H139.676V52.934H0V31.643H19.351V13.566h23v-.1H68.9V30.5h40.921V13.466H127.51V0h59.062V16.651h15.037V52.934Zm-4.314-19.3V20.3H169.538V33.634Z" transform="translate(5780.533 222.563)" fill="${primary.base}" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
        <path id="Union_23" data-name="Union 23" d="M88.473,52.935h-17.7V35.293h35.393V52.935Zm17.7-17.641V17.647h17.7V35.293Zm-70.781,0H0V10.48H53.084V35.293Zm88.477-17.647V0h17.692V17.647Z" transform="translate(5840.584 222.563)" fill="${primary.dark}" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
        <path id="Union_18" data-name="Union 18" d="M17.7,52.935V35.293H0V17.646H35.393V0h88.472V17.646H53.084v8.823H35.393V52.935ZM141.562,17.646h-17.7V0h35.388V17.646Z" transform="translate(5752.107 222.563)" fill="${primary.light}" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
        <rect id="Rectangle_572" data-name="Rectangle 572" width="17.692" height="17.646" transform="translate(5787.5 240.209)" fill="#040505"/>
      </g>
      <g id="Group_179" data-name="Group 179" transform="translate(425.285 715.8)">
        <path id="Union_134" data-name="Union 134" d="M8771.764-2260.079v-17.694h17.7v17.694Zm35.387-17.694v-17.694h17.7v17.694Zm-70.774,0v-17.694h17.689v17.694Zm35.388-17.694v-35.392h17.7v35.392Zm-70.781,0v-35.392h17.7v35.392Zm-53.085,0v-17.7h17.7v17.7Z" transform="translate(-15602.897 2147.247)" fill="${primary.hue.base}" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
        <g id="Group_176" data-name="Group 176" transform="translate(-8647.897 2330.858)">
          <path id="Union_133" data-name="Union 133" d="M8789.461-2260.076v-35.389h17.691v35.389Zm-70.78-17.7v-17.691h17.7v17.691Zm-70.783,0v-17.691h17.7v17.691Zm106.17-17.691v-35.394h17.7v35.394Zm-70.775,0v-17.7h17.69v17.7Z" transform="translate(-6901.915 -183.612)" fill="${primary.hue.light}" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
          <path id="Union_132" data-name="Union 132" d="M8718.675-2260.077v-17.7h17.7v17.7Zm-70.778,0v-17.7h17.693v17.7Zm106.173-35.388v-35.395h17.69v35.395Zm-106.173-17.7v-17.7h17.693v17.7Z" transform="translate(-6866.522 -183.612)" fill="${primary.hue.dark}" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
        </g>
      </g>
    </g>
  </g>
</svg>`;

  return p;
}
