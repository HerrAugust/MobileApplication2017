import {Component} from '@angular/core';
import {IonicPage, App, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import * as moment from 'moment';

import {HomePage} from '../home/home';

//Providers
import {AccountProvider} from '../../providers/account.provider';
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';
import {BreedProvider} from '../../providers/breed.provider';
import {DogProvider} from '../../providers/dog.provider';

//Models
import {User} from '../../models/user.model';
import {Dog} from '../../models/dog.model';
import {Breed} from '../../models/breed.model';

//interfaces
import {DogRegistrationInterface} from '../../interfaces/dog-registration.interface';

import {Language} from '../../modules/dictionary/types';
import { Events } from 'ionic-angular'; // needed for pop from CameraPage


@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'dog_registration.html',
})
export class DogRegistrationPage {

    user: User;
    dog: Dog;
    dogss = [];    
    editable: boolean = false;
    languages: Language[] = [];
    preferredLanguage: string = "";

    gender : string = "M";
    collarId : number = null;
    age : number = null;
    name: string = "";
    date_birth : string = "";

    breed_hidden : boolean = true;
    breed : Breed = new Breed({id: -1, name: 'None', origin: 'None'});
    breeds : Array<Breed> = [];
  
    picture: any =  ' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH4QkJFCsVYVZdUgAAIABJREFUeNrtfXl4k1W+/+d9kzRt0jRdEtp0T3ehlE1BNgWRtXMvbog6oDj4U0EfAUdcGJ3BlVFGxkFBxnHh4pWrAt6BQRHwguybVGgLtNAldEnaJl3SNGmavMvvDyaRAsJ7srQNvJ/n6eOj5s17cs75nO96vl+K53keIkSIuCJocQpEiBAJIkKESBARIkSCiBAhEkSECJEgIkSIBBEhQiSICBEiQUSIEAkiQoQIkSAiRAiDVJyCngfLsujq6oLb7YZCoYDdbkdnZyfsdjsAQKlUIiIiAkqlEg6HAzKZDHK5HBKJRJw8kSDXD8rLy1FbW4vW1lb89NNPUCqVkMlkMJlMaGxsREtLC/Lz80HTNCiKAkVRAACe58HzPDiOQ2lpKWJjYxEfHw+dTge32w273Y6bb74ZMTExSElJQW5urjjZQQIlZvMGBi0tLaiursb27dthMpngcrmgVqvBMAzCw8MhlUq9m18ikYCmadA0DYZhrn6CSaXgOA4cx4FlWS+JGIaB0+mEVCqF1WpFWFgYdDodJk+eDL1ej9jYWHFRRIL0LkwmEzZu3Ihz587B4XBAqVRCrVaDpnvHtOM4DlarFXa7HQqFAtnZ2bjvvvug0+nExRIJ0jNobm7Gtm3bcPDgQTgcDiQnJ0MqlYKiKPSVqfSMhWEY1NXVQaFQYNSoUZg6dSri4uLERRQJEnjU1NRg+fLlsNvt0Ol0kMlkfYoU1yKL2+2GyWSCUqnE4sWLkZqaKi6qSBD/cfToUXzxxRdgGAZarTYkSHEtspjNZkilUvz2t7/F8OHDxUUWCUIOg8GATz75BFarFTExMV7j+HoBz/NobW2FWq3G3LlzkZ6eLi769UaQxsZGnD59Gi6XC9u3b0dKSgoYhoHVagXDMIiJiUFcXByqq6sxduxYKBQK3HbbbVf9zq6uLixbtgxnzpzBTTfddENsAs9vfemllyCXy6/62b1798LhcGDfvn3Q6/Vobm5Ga2srpFIp1Go1pFIpamtrMXnyZISFhaF///6Ij48XCdJTMJlM+P7773H8+HFvIE2lUkEqlXpVH09MweMelUgk3viB2+1GTk4Obr75ZowdO7bbd+/cuROrV6/GwIEDve7VGwEed3NJSQnmz5+PiRMndvv/+/btw08//YSzZ89CJpN54zksy3rd1Z7YjWf+GYaBzWbzBkKHDRuGKVOmhJxHLWQIsn79ehw+fBgdHR1ITEz0RpV9UX04jkN9fT04jsODDz6ISZMm4dlnn4XVakV6ejpYlr0h1QmJRAKDwQC1Wo0VK1Zgx44d+J//+R/QNI2kpCSf3Nee7cWyLIxGIyIjI3HrrbfioYceEgniL+x2Oz755BPs3r0beXl5kMvlATOSPVLGbDajvr4e+fn5kEgkuNFNMoqiwLIsSktLkZSUBK1W2006BMJJ0NXVhbKyMowfPx5z586FUqkUCUKKP//5z6ivr4darUZYWFjQ1J2L1bFgbjjPOzyRc47jvOkkng14qYpIUZQ3DcVzekulUq9KE0xCX6o2BeP7XS4XrFYrkpKS8OKLL4oEEYIjR47g448/Rnx8vDc9I9ROYJ7nwbIsGIZBY2MjMjIy0NDQgOTkZOTn54NhGKjVami1WkRGRiIyMhIqlcprIHd1dcFms6GjowMdHR0wm82wWq2QSqUoLS1FXV0dEhISUFVV5Z0niUQSsi5ozzw99thjGDFihEiQX8Pvf/97dHV1ecV6KBm5ngzd1tZWUBQFvV6P4cOHo3///ujXr1/A3cQ8z6OpqQmnT5/G0aNHUV1dDZ7nERMT4838DSUng0fdlcvlePfdd0WCXIyqqio8/fTTGDFiRMidgCzLoqqqClqtFkOHDsXUqVOh1Wp7ZSxmsxnbtm1DUVERzGYzMjIyQi5FnqIoHDlyBB988AEyMjJEgnz22Wf46aefEB8fHzInHk3TaG9vR2dnJwYPHozp06ejX79+fWqMTU1N2Lx5M06cOIGIiAhERUWF1Pw2Njbi5ptvxqOPPnrjEuSvf/0rSkpKkJ6eHhKLR1EUurq6UF5ejvHjx+PJJ5/s83YSwzBYs2YNdu/ejdzcXMjl8pCQ0jRNw2AwYODAgVi0aNGNRRCn04kHHngA+fn5kMlkIaNWnT9/HrfffjvmzJmDUMTatWuxZ88epKWlhYy65Xa7UVpaii+//BLh4eHXP0FaWlqwdOlSxMXFBYwYF3uO3G43eJ4HRVHeuIm/J1lLSwskEgkWLlyIlJQUhDJqa2vx3nvvgWVZxMbG+i25PXENz5zLZLKAe9QoikJzczOWLl3a4xfBepQgRqMRr7/+esC8OjRNw2azob29HWFhYUhNTcWQIUOgUCggk8nw7bffehfOF0gkEpw+fRrTpk3D7NmzcT3h888/x3fffYf+/fv7nDngmdvCwkK43W44HA78/PPPqKmpgcvlQlRUFFQqVUDUZ4/X7pVXXkFiYuL1RxCj0YilS5cG5MdxHIf29nbU19dj1qxZGDZsGJKTk7t9xmQyYeHChRgwYIBPC8TzPMrLy/HnP//5us10NRgMePHFF5Gbm+vTIULTNE6dOoX33nvvshyruro6HD9+HP/93/+NpKQkREVFBeSmZSD3UZ8hSEVFBd58802kp6f7JXYpivIG3O69917k5eX96mfnzZsHnU7nEzlcLhccDgfee+893AhYuHAhFAoFwsLCfCKJyWTChx9++KufKSsrw6ZNm7wBTn/3gMFgwB/+8AdkZWWFPkEqKyuxdOlSZGVl+TwxFEXB4XDAZDLh+eefR35+/lU//+yzzyIyMtKnE6uzsxMajQaLFy/GjYTly5fDYrEgIiLCJ4ne0dGBFStWXPVzpaWleOedd6DT6aBQKPzaDxUVFVi6dCkyMzODOi9BrS7Q0tKCZcuW+UUOmqZRUVGBrKwsrFu37prk2LRpE2QyGTE5KIpCZ2cn0tLSbjhyAMDixYuRlpaGzs5OYnWLpmnIZDJs2rTpqp/Lz8/HunXrkJWVhYqKCp9VLp7nkZWVhWXLlqGlpSU0JQjHcXjooYdw0003+UQOj4uvrKwMf//73wUVG7DZbD55miiKQmNjI7Kzs3vV594X8Ne//hXnzp1DfHw88bp5PGQqleqan21ubsYTTzyBvLw8n139FEXhzJkzWL9+fdAqyQRNgtx3333Iy8vz6YfTNI3a2lqo1Wps3LhRcCWOZcuWXWasCwHLskhISLjhyQEAixYtQkJCgk+ereTkZCxbtkzQZ+Pi4rBx40ao1WrU1tb6fNckLy8P9913X2hJkGeeeQbR0dE+s7qlpQU5OTl4+umnBT/zz3/+E7t370ZMTAzRuxiGQXl5OTZs2AARv2DGjBnIzc0lzhRobW3F+PHjcddddwl+5oMPPsDZs2d9jnFwHIe2tjasXLmy70uQ999/H0ql0mdymM1mFBYWEpEDANatW0dc84mmaVitVqxdu1ZkxCVYu3YtrFYr8TrGxcVh3bp1RM88/fTTKCwshNls9tlOVSqVeP/99/u2BHnjjTdQVVXlU24Vz/Noa2vDjBkzMGbMGKJnn3/+eSgUCuJJPXnyJN57772Qj44HC7W1tVi4cCEGDRpEvJ4OhwPvvPMO0TP79+/Hhg0bEB0d7ZOjwGAwICMjAy+//HLfkyC7du3C+fPnodfrfSbHzJkziclhMBjQ2dlJPF6r1Ypp06aJ5LgKUlJSMG3aNFitVuJnOzs7YTAYiJ4ZM2YMZs6ciba2NmLbleM46PV6nD9/Hrt27epbBDEajVizZg1SU1OJjTue52G1WjF37lyMGjWK+N2vv/46sWrl8ZDNnTtXZME1MHfuXLjdbuITPS4uDq+++irx+0aNGoW5c+fCarUSk4RlWaSmpmLNmjUwGo19hyBvvPEGBgwYQEwOiqLQ1taG2bNno6CggPi93333HSIiIogWTyKR4OjRo8Ti/0bGO++8g6NHjxJdvqIoCkqlEv/617+I31dQUIDZs2ejra2NmJgsy2LAgAF44403+gZBnn32WWg0GmK2e1IUJk2ahGHDhvn07h07dhC/22azYf78+b2SOh2qCA8Px/z582Gz2Yg0A41Ggx07dvj0zmHDhmHy5MkwmUzEjgLPu5999tneJcg333zTreIGyenS0NCAvLw8FBYW+vTubdu2QSaTEb+3sbHR53feyCgsLERjYyPxiR4eHu6TFAGAadOmoX///mhoaPDJaKcoCt98803vEKS8vBxfffUV1Go18bNutxthYWFYuHChzwP//vvviT1XJpMpYKL3RsQbb7wBk8lE9IxCofBZigAXYmrh4eFwu93Ez6rVanz11VcoLy/vWYK43W68/PLLyM/PJ/ZYMQwDmqb9ypTdvn27t/0AiW6anJwseq38QEpKCpKTk4lsTc/FtW3btvn83hUrVkAmk12zG9el4DgO+fn5ePnll30iGOBjHOSll17y1mIiVXHOnj2LL774wq+FeuaZZ4gqrnvuLXz11VfiLg8AZs6cSXzPprm52e9A3uzZs31KfPXUKBOaBuOXBPn666+9/SVIIJFIUFlZiU8++cSvSdq3bx+x56q9vR3Tp08Xd3aAMH36dLS3txOrWvv27fPrvR9//DGqq6uJbV6pVAqz2Yyvv/46uARpamrCV199hbS0NCIW0zSN0tJSLFiwwG/v0eeff058Z8Fms4VMseRQwEMPPUTk0QKAiIgIfP755369Vy6XY+HChTh16hQRSXieR1paGr766is0NTUFjyDLly/HwIEDieMdVqsVM2bM8Nmd60FRURExwZxOJ1HinAhhuOuuu+B0OomeCQ8PR1FRkV/vHTx4MB544AHi6D7Lshg4cCCWL18eHIJs3ryZ2Ejy2B0WiyUgKck7duxAdHQ00TMdHR2YOnWquKMDjKlTp6Kjo4PomejoaL88Wh7cfffdaG5u9ukePcMw2Lx5c2AJ0tTUhE2bNhFvTs/VyP/6r//ye1LsdjsOHTpEZPt0dHRc1gxGROAwceJEIpJIpVIcOnQIdrvd73evXbsWFRUVxCSJjo7Gpk2bBKtaggjy7rvv+mR3GI3GgGVWrlq1CoMHDybynFitVtE4D7KxTqLqcByHwYMHY9WqVQF5/8svvwyj0eiTPSK0QPY1v/nYsWPeHnQk5DAYDLjzzjuRm5vr90TwPI/6+nriuMeQIUPEXRxkDBkyhDguUl9fH5Cicrm5ubjzzjthMBiISCKVStHa2opjx475T5DVq1cjOTmZ6Ae5XC4olUrMmDEjIIuwfft2MAwjmCAUReHcuXOYN2+euIODjHnz5uHcuXNEa8MwDLZv3x6Q98+YMQNKpRIul4vowE1OTsbq1av9I8iaNWug0WiI1BqaplFZWYk//vGPAVuEffv2ESUlut1uTJ48+bpr3dwXQVEUJk+eLDhS7Ukk9DcmcjH++Mc/orKykkiKcBwHjUaDNWvW+EYQhmHw7bffIioqimiwTU1NeOyxxwLWI6OhoQFVVVWCo/YURcFoNGLcuHHi7u0hjBs3DkajUfCBJJFIUFVVhYaGhoC8X6vV4rHHHiOOcURFReHbb7+9qneWvppRTKpfsiwLtVqNCRMmBGzyv/vuO2RlZQmWYhzHIT4+Hnq9Xty5PQS9Xk/U34XjOGRlZeG7774L2BgmTJgAtVpNvF+HDBlyVafBFQliMpmIo5XAhXybZ555JqCTf+TIESLpYTabMXnyZHHX9jAmT54Ms9lMJEWOHDkS0DE888wzaG5uJnrGk6f3a1nKV2TAu+++S9zw3el0YtSoUYiPjw/YDz558iQ4jhM86RzHQaFQiOpVL6lZCoVCsBTxdP09efJkwMYQHx+PUaNGEUf4dTrdr7p9LyOI0WhEa2srsfRoa2vDrFmzAjrpX3/9NRITEwUb5y6XC9nZ2eJu7SVkZ2cL9ibxPI/ExESfEgivhlmzZqGtrY1YirS2tl7xHvtlLNiyZQt0Oh2RW9disQTFpUqaTmCz2cTAYC9i+vTpREmMnsY4gca8efNgsVgEf57neeh0OmzZsuXqBGFZFnv27CG6yupx2w0aNCigP3L//v2IjIwkGodCoUBCQoK4U3sJCQkJxFXbIyMjsX///oCOY9CgQcS1CmQyGfbs2XOZkd+NIB9++CEyMzMFfzFN0zh37hyeeOKJgE/2zp07ia7U2my2PteE/kbE8OHDiaSIQqHAzp07Az6OJ554AufOnRNsKvA8j8zMzMv6nHR7uqSkhCilhOM4ZGRkEBv01wLDMKiuribyXnV0dOCOO+4Qd2gv44477kBHRweRN6u6utqnTPFrGd4ZGRlEQW6pVIqSkpIrE2T//v1EqhVN0yguLsaSJUsCPslbtmxBSkqKYEnmaUhJWrhaROARGxuL6OhowfEInueRkpJyRf3fXyxZsgTFxcVEDieZTNZN5aMvVmlIKhQyDIOcnBziyiJCcPDgQSJJxjAMcclSEcHD6NGjiQJ2UqkUBw8eDPg4FAoFcnJyiKRTXFxcN5XPS5BTp04RFWGw2+1YsGBBwH+UxWKB2WwWzHqKolBZWYnf/OY34s7sI5g+fTpRAiNN0zCbzUSeJ6FYsGAB0f0TiUSCU6dOdSfI7t27iSqy8zwPl8sVcNsDuBA5J4l9MAyD2267TdyVfQxjx44VfHJ7YiKBjqx7bBGXyyV4P3Ech/T0dOzevfsXgpSUlBDd9Xa73Rg/fnxQJvbQoUOCbSFPpcRbbrlF3JF9DDfffDNRJUaZTIZDhw4FZSzjx48nqosVHh7uNdZpAD5ly95zzz0B/yFtbW2ora0VPBbPqTB8+HBxR/YxjBw5EhzHCT65JRIJamtriaPgQnDPPff4lG0MAHRTUxNYlhX8MMuyAbkleCVs3ryZyHvFMEzAA5QiAoeCggJibxZJQQUS5ObmCh4LRVFgWRZNTU2ga2trwfO8YIK0tbVh5MiRQfkR+/btI/JeNTc3B0WSiQgM7r77biLDWyqVBvQi1aUSTah0oigKPM9faC568OBBxMbGCjq1eZ6HUqkMikpTVlZGVG+X53lERUUFxVEgIjBISUkhSj2hKAoymQxlZWUBH8vw4cOhVCoF7/PY2FgcPHgQtE6nIxI9JpMpKLEP0l4fnZ2dyMrK6rXFb2xsRGlpKWpqavrk5nQ6nSgtLcXhw4dRWVnZa+MYMmQIkTfLn54iV4NCoYDJZCIyJXQ6HaQGg0GwURxM79XRo0eRnZ0tmCB2uz2gNxeFLuCnn36KAwcOoF+/frDb7ZDL5XA6ncjNzcV//ud/Ii0trVeJcfz4caxfvx6tra1QqVTo6upCZGQkamtrMXz4cDz11FM92jxo7NixOHz4MDQajWA16+jRo0EZy/jx43H27FlBXlKJRHKhWkpdXR1RgNCXhpnXwsmTJyGXy4mecbvdyMjI6LGFLi4uRmFhIQwGA1JTUyGXyxEXF4fIyEhoNBqYzWb8/ve/x1/+8pdeI8eqVauwatUqqFQqpKWlISYmBjqdDpGRkejfvz/a2towf/58HD58uMfGlJaWRnyBSS6XB/QilS97VyKRoK6u7oKRLpQgHMchKSkp4AP/8ccfkZSURJR71ZOZu/v27cOqVaswcuRI71xdKqppmkZBQQFMJpOgcjKBxvPPP4/a2lqvBPPM5cX/lEgkSEtLw6effooffvihx8Y2YsQIIm9WUlISfvzxx4CPIykpSXAw3ON2pkk6mPI871NHqWtt9jNnzghOLfGk2D/wwAM9sritra3429/+hqSkpGsuMsdxiIqKwrFjx7yR2J7Ae++9B57nER4efs1DxuNOXbVqFcxmc4+M78EHHyRKPadpGmfOnCEukn4tqNVqIoeB2+0GHRsbS3SPOBB1VS/Gzp07vf3khBJKr9dDqVT2yOJ+8skn6N+/P1EaTkZGBj766KMeGV9XVxdOnz5NdLmMZVkUFBT43atFKCIjI6HX64mcQTRNB/yeiN1uJ6pvEBsbCzomJkbw4kul0oDrhseOHYNWqxXMbIfD4VM/dV83H4l0u3gDarVav0v9C8E///lPn7sMnz17ltg+8BWjR4+Gw+EQfMhotVpBpUFJbV2hcTaO4xATEwM6Li6OSIIE8mKL3W5HeXk50QZ0uVw91s6gqqqK6ArAxVCpVN2yQoOFlpYWYgJ7NqFGo+kxF/CUKVOIyoPSNI3y8vKAaiwk5Ws5jkNcXBxotVotmCCeiu2B0l3Xr1+P1NRUwacfz/OIiIggbv/mK8rKyoj7MF4q7YKNM2fO+DxGiUSCs2fP9shcSqVSREREEK11amoq1q9fH5D3m81mokrwHMdBrVaDzsvLIzKGVCpVwLw01dXVRLcYLRYLZs6c2WPGry8n86USN9jwh8A9NUYPZs6cSZR6IpPJUF1dHZB3r169GiqVikhNzsvLA63X64nSkpVKJSorK/3Wrw0GA9HFKJ7nERkZ2aMtDfLy8nzW0T1pE8FGZmamz94ep9OJvLy8HpvPIUOGIDIykqgoiNlshsFg8Ou9RUVFqKysFOzY8Vyj0Ov1oLOysohEH8dxyM7Oxttvv03cgutibNiwgaj+FsMwASuILRR6vd4nNYmiKDQ1Nfndk1EIdDodca96Dzo6Onq8hrFWqyVKPdHpdNiwYYPP7+vo6MDbb7+N7OxsIk9kREQEsrKyLtwHIbEDPOKnf//+mDNnjs8D379/P5EtYbVace+99/boYoaFhUGv1xM7JmiahsPhQEFBQdDHePfdd6O2tpZYVWIYBmlpacQZDP7i3nvvJepKJZVK/aqbNWfOHPTv359IynpiRcC/L0zNnz8fRUVFxK2sBg0ahHvuuQf19fVEgz548CBycnKIS7L0RsX2+fPno6Wlheh+dXFxMebOndtjdlJhYSGRpPMU+X766ad7fD71ej1xaamcnBziog719fW45557MGjQIOLWgUVFRXjqqad+IUhkZCTGjRtHfFKyLIvBgwdj6dKlWLt2reDntm7dStTr3GazBe0OyrUQFRWFRx55RFADe4qi0N7ejsLCwqAldV4JDzzwANxuNzo6Oq45RolEgoqKCvz2t78lbsoaKIwcOZKouFxERAS2bt0q+PNr167F0qVLMXjwYGL7jGEYjBs3zht49c7mrFmzcPbsWWLPDcdxSE5ORmlpKebPn4+VK1de1XfNMAzOnTtHdIr0RubuxRgxYgSef/55nDp1Ci6Xyyv5Ls4AYBgGFRUVyM/P90v19BUrVqxAWloaSktLvRLeMz6apsHzPBiGQVFRERYtWtSrhS4mTJhAFN+QSqU4d+7cVQ9wu92OlStXYv78+SgtLUVycjKxbeYJnl5chJ3iL5I/X375Jfbv308U2b4SYcrLy5GSkgKKolBQUICkpCSkpKSgvb0dx44dI/ZHu91uLFu2DH0BH374IUwmE5qammCxWKBWqyGXy5GdnY1HHnkEsbGxvTq+U6dO4eOPP4ZUKkV1dTXi4+PR2toKnU6Hfv364YUXXugT8/jSSy9BJpMR7YPExETccsstiIqKQm1tLerr61FcXOy9/Zebm+uza96jdo4ZM6Zbnl83ggDAk08+ifj4eL/84zRNe0Wb2+0Gx3HgOA4WiwUajYbowlVXVxduv/12TJkyBX0JNpsNnZ2dCAsL6zVV5VrzZrVaER4eDrfb7XNGQLDw/fffY8+ePUROAofD4d1DNE2DpmmvK10ikfjszfNI3MbGxst6Fl5GkPLycvzlL39BSkqKXy/8NZaSSCaKomAwGPDZZ59BxPWHRx99FOnp6cR7IhAtpC890Gtra/Hcc89dVpDkMnmUm5uL+++/HyQ3DUlYSuoESE9PF3fSdYr09HRiIzrQ5PDcHLz//vuvWK3nigrbxIkTMXz4cJSXl/dY3tOVTgqLxYK7775b3EnXKTxVT3qrXbdUKkV5eTmGDx+OiRMnXlm6/NrDTz75JEaPHo3y8vKASxKhRllYWFiPBNtE9A4KCgoQFhYWcFVeqOQoLy/H6NGj8eSTT/66+nW1L5k3bx4mTJiAioqKXmG52C3q+kdvrDFFUaioqMCECROu2TrwMiP9SigqKsKHH34InU7nd4arUKOptLQUn3zyCVEGpojQg81mw9y5c5Gfn98jkoTjOJhMJsybNw9Dhw699l4U8qVDhw7F8uXLAVy4oONhYbDA8zxiYmJEctwAUKlUiImJCbjxfanEuHjvLl++XBA5BBMEAKKjo/Haa69hypQpsNlsqKmpCZo0sdvtuPXWW8Xdc4Pg1ltvDXitg4u1kZqaGthsNkyZMgWvvfYaUdyK2EU1bdo0TJs2DTt37sS6deug0Wggl8sRHh4eMB+12+3usXvnInofo0aNQnFxccCkBc/zcDqd6OrqgsViwcMPP/yrXqqAE8SDiRMnYuLEiTh58iR+/vlnHD9+HO3t7UhMTARFUZBIJJBKpcSE4XkePM8HrYK8iL6H3Nxc77qTqu6eOgksy4LneRiNRkRFRWHYsGEYMmSI39X/BRnpQsGyLA4ePIiqqio0Nzfj559/hkajIaqlxbIsUlJS8Pjjj4s75wbCRx99RNQbBrhwR8hisWDIkCGIi4tDRkYGRo0aFdCwREAJciVs3boVBw8eRFhYmKDToLa2Fs8884wY/7jBUFxcjJUrVwruD+NyuTBq1Kig96YMus92x44dgu9m8zwPmUyG/Px8ccfcYMjPz4dMJhOskstksqBUge9Rgng2PGnPj56ItYjoW6BpGlFRUcS9RIKsAAWXIHV1dTCbzYIJ0tnZ2asXo0T0LiZMmCC4Arvn/kZdXV1QxxTUTETPzS4SlvfFuxWBAMMwqKmpQV1dHQwGA6RSKRITE+FwONDV1QWn0+ktMRQeHo7w8HDI5XIoFAoYjUYwDIP09HQkJycjNTW115JIgwmSted53nuT1VNgIRgIqpH+6quvgmEYQV4FmqZx/PjxoDVx7Ek4HA4UFRVh//79cLvdKCsrQ2RkpFd99MyHJ7WCoijvn2eVu0/YAAAWmElEQVTxPX+euQEuePg4jkN7ezs6OjqQl5cHmUyGMWPGYOjQoUHp/NXTmD59OoYNGyYo7YRlWUilUvzpT38KTQlCUrWdYZiQN8537dqFQ4cOwWKxgKZpKBQKUBSFnJwc78YPBDwFBdxuN1wuF/73f/8XmzZtgkajwciRI3HHHXeEtLHOMIwgO9Rz3z5kbZA9e/YI9mBxHIf4+PiQXNRjx47h8ccfx5YtW9DV1YWoqCioVCpIJBJvwYRACmrP93mkkUqlQlRUFLq6urBlyxY8/vjjAa+M3lOIj48XnLQok8mwZ8+e0CSIzWbD0KFDBd8Y8xSjCzW8+eabWLNmDZKSkhAdHU0kNQOqK//7NI2OjkZSUhLWrFmDN998M+Tmk6TIG8uyGDp0KFEJoT5DkBMnThC1VWhubsaAAQNCajHvv/9+OBwO4sqUwYanMrrD4cD9998fUnM6YMAANDc3E7UpOHHiRGhKEJKT1NNCLFRw1113EQe3epoknqDrXXfdFTLzKqSN3KWHa0hKkI6ODsH2h6etWkxMTEgs4urVq4nasvUmOI5D//79e6WxqC+IiYkhatcmk8n8KqLeawSprq4WnDRG0zSqqqpCYgFPnTqFo0eP9njRZ38gl8tx9OjRHul4FQhUVVUJ9k5JJJKA9RDpUYKcP39e8I/0NCsJBXzwwQfQ6/V9Uq26mrql1+vxwQcfhMR4SZo60TSN8+fPhx5BBgwYQOSNCGY0NFDoqX5+N/pvSElJIdo7wXTuBI0gJpOJSIIkJSX1+YX74YcfEB0d7Zf0kEgk3ltvHMeBZVkwDOMN+rlcLrjdbu8lII7jvBeJ/LnnwPM8oqOj8cMPP/T5eRbSk/5iCWIymYI2lqBE0p1OJ5qbmwUH/iiKQlVVFcaMGdOnF661tZW4rRrP82BZ1rvZi4uLkZKSgpiYGERERCA8PBwRERHeP+BC0qbnz+l0orOzE62traitrUVBQYE3QOghm1DIZDK0traGhA1C0o/FbDbD6XQGxQsaFIIwDIOOjg7B7cF4nkdmZmafX7iioiKi8jQMw8Bms0Gv1yMtLQ23336739XfW1pasGfPHpw/fx7V1dVQqVSCExelUmmP9G73F5mZmYIdCjRNo6OjI6DtyYNOEJZl4Xa7iU7ZqKiokDjZBg0aJDiRTqlU4o033gjoGGJjY7uVY122bBkcDocg9UsikYSEt5DkXghwISfN10amvWKDcBwHl8tFFA0NhUzUSZMmCSa+0+nEI488EvQxPfLII4I78brdbkyaNKnPzzNJsJCiqG5NjUKCICzLCl40jwFK0pKtt7B3717B6oxEIsHp06eDPqbTp08LNt6lUin27t3b5+fZsxeEksTpdIaWBFGpVMjPzxc8aE/b3b4OjUYj+KSSSqU4c+ZM0Md05swZwaTlOA4ajSYkCCKUHCzLIj8/P2hVOINCEJvNRtx2NxRUrMzMTMG/KywsDPv37xcsSX2B0+nE/v37BVWM8WymUHCGkBDE87uClY8VFIKQ2B8Xb6i+DpK7ChzHISMjAytWrAjaeFasWIGMjAyiMYXCnRtSV7rHDgkZgviSkdnW1tbnF+6OO+4g6kceERGB8vLyoNgip0+fRnl5OZFq6nA4QuK2YXt7e5/JBA8KQZRKJVHUN1QIotfrvZFtoSd2ZmYmXn/99YCP5fXXX0dmZqZg6eGJ3Ov1+j4/z21tbUQEkUgkUCqVoUOQ9vZ2lJSUCCKJp1hBKBAkLi6OuFssx3HIyckJaPvlF154ATk5OcSuTV/G3xuwWq3dilhcixwlJSVob28PHYJIpVLidHCr1YpQwPTp01FZWUlULICmaXR2dmLx4sV+v3/x4sXo7Owkfn9lZSWmT58eEnNMKkHkcnnQyiAFhSAymQxRUVGCTziapkMiRwgABg4ciH79+hF76TQaDViWxcKFC31+98KFC8GyLDQaDbGXp1+/fhg4cGBIzLFHggiV0FFRUcSGfa8b6SQxg1CSIADwxBNPeLsVkahansJovpDE80x0dDSxatXS0oInnngiZOaXZC94YjshZaRLpVJotVqiUy6U+qHn5uYiNjaWeKNyHIeYmBio1Wo8/PDDgi76nD9/Hg8//DDUajViYmJ8emdsbGxI9Vsh2Qs8z0Or1QZNxQpa4bi2tjbBrA4LC8OuXbswbty4kFnEV199FQ8//DAyMjKInvOk1mRlZeFPf/oTRo8ejUcfffSyBWYYBp999hkOHDiArKwsIu/ZxTAYDFi3bl1Af3tTlwPr68vxf821aHN3+fQd0TI5JmhS8FBiLvrJuweJd+3aJTguFmwHT9AIcvFFHyHojV7s/uKVV17BW2+9hfT0dOLN63G5GgwGLFiwAPn5+V6yVVVVobS0FNHR0V7XMikoioLBYMArr7wS0N9c22nDu1VF2NBQ4d8XdQJF7WYYHO34fcZQpESouu0FkjSlYBbPCNqNwtGjRwvO0adpGm1tbUFr5BgsZGdnY9y4cT6P21OaR6vVor6+Htu3b8f27dtRX18PrVbrV0khu92OcePGITs7O3CHHjisOV/iPzkuwoaGCqw5XwIOnHfcbW1tgr10DMNg9OjRoUcQAOjqEiZ+KYpCa2ur4NL3fQmPPPIIZDKZ3xd2pFIpoqKiEBUV5bc+zTAMZDJZwNPtT7RZsKUx8PdJtjRV4YTVckGw/Pv2pFDNQ+ge63ME0ev1ghea53kkJCSgoqICoYg333wTRqOR6JJYsOB2u2E0GoNSdvRQmwktTOA3ZIu7CwdbjACAiooKJCQkCJacUqk0qNkBQSPIoEGDUF9fT2SDlJWVIVTx6aef4uTJk71Sl/dinDx5Ep9++mnAv7eTZXG4rSFo4z5ibYSDYVBWVibYHqUoCvX19X53su01FYvEFSqTyXDgwAGEMrZu3YrS0tKgprj/GpxOJ8rKyrB169agfH+FvRXF7ZbgEbvdjMrONhw4cICoI4C/d/yvKaGC+eX5+fk4f/684B+sUCjQ2toaMiVIr2h0btiAF198EU6nk/heg08nHE2jvb0d4eHh+PLLL33+nqYuBwyd7Wh2OcFeYcxH2xpgcQeP+M3uLnxeXYqWzAR0KSMuO8XlbgbqThYKN9fN1gp2T5mgdpjau3cvtm3bJjgvy+FwYMKECZg8eTJCHZ9//jl27NiBrKysoJHEUy5p0KBBePbZZ31XD2tOYXNTFc7YWtDJ/bqzIdiViCnu331UrqClSlkesXY3Ms0O5DfYvQb61KlTcdttt4WmipWdnY2mpibBenl4eHjIq1kezJ49G88//zzq6uoEd0wikRoMw6Curg7PPfecz+TgOA7vVB7Hy2cP4SdrE+wcA+7fRLjSX7DB0xQgoQH68j9GJkFTdDgOZkbjWGoUeABNTU0BdWP3OEF0Op3XSyXUUK+trQ1a6nJPY+DAgfjHP/4BrVaLkpISosDpr0kMnudRUlICrVaLf/zjH34lIK6qKcbfDCd63bFANAc0jRNpapxMVnXbYyFJEACYMmWK4OuQPM8jKSkJ33zzDa4nLFiwAG+99RYUCgXq6up82pAURaGurg4KhQJvvfUWFixY4NeYfmprxOd1oes1PB2vQG7hnUF/T9AJkpeXR5QKIJPJsHPnTlxvyM7OxgsvvIDnnnsOZrOZ6A61y+WC2WzGc889hxdeeCEgasXu5lrUd9lDdj7tijCYderQJ8jAgQNx5swZwTo4z/NITEzE2rVrcT0iNzcXS5YsIarCYbPZsGTJkoBm5B5rawr5uTzfA3U+6J74If/xH/9BFBtQqVRB8+f3BZAUfvDnmavB5LKH/Dz2xG/oEYIUFhYSGd6etmHLli2DiODAFeAMWJ7nkR6hwm+06ViYPhhLs0dgafYILEwfjN9o05EeoQq4u9vVAy3wpD2xGDqdzluQmKSsfW1tLQwGQ0hdpgoVBHKzDlZpcFd8Ju7UpiI1QgXJJWvM8jxqOm34wVyDfzZW4oTN0ud+Q69KEAC4++67YTQaiTw4Wq0WK1euFHdzH8asxFz85aax+H9p+dAroi4jBwBIKAp6RRT+X1o+/nLTWMxKDJ3bjT1GkFtuuQVSqZS4oJxEIrluDfZQx7P6IXgt51bcpBKeD3WTKhav5dyKO6yUSJBLcf/99xMXO1CpVNixYwdOnjwp7sg+hEeTb8Ki9MGQSy7X0lmeh51xw864r5jXVVZ6CszGHzDAaBMJcjHGjx+Pjo4OIjWL4zjk5ubi448/RlNTk7gz+wAmxCXjsZT8y1z3be4ubDJV4KWyA5hzcgfmnNyBl8oOYJOpwnt3vampCR9//DHycnORX9+BlGaHSJCLsWTJEphMJuLaqxqNBnPmzBF3Zy9DSUsxU5eDdEX3jmAHW01YeHovFp3Ziy+M5TjY1oCDbQ34wliORWf2YuHpvTjYasKcOXO8db2inAxyGhyQulmRIB5kZWUhNjaW+PYdz/MYOXIkZsyYEbR+dCKujan90jGpX9pl5Hi3qgg7LTVXVKlYnsdOSw1+96/PkTr59m52aFprJ/QtTpEgF2Pp0qXEUgT4pVnKjBkz+sT11hsNYRSNiZpUyKhfts15Rzs+MJwUdNvQlhSHokQl2uW/3BiU8EBqcydolhMJ4p3osDA8+OCDPmXt8jyPYcOGobCwEEajUdy1PQi9Igq3qPt1+28bGyqwp6Ve8HfUx0bgXHz3OlgJVifUTkYkyMW488474XK5fOotxzAMxo4di1deeQXbtm0Td24PIVcZA81FRd4anXZsN58n/h5DbAQc0l+0h3CGR4zdLRLkUrz//vuorKz0Kf2bZVmkpaVhw4YNWLp0qbh7ewCZCnW3QGCZvRUVdvKqhm0RMrREhnXbhOpOUYJcEW+//Tbq6+t9unHHcRzS0tLQ1dWFp556CseOHRN3cZDA8zx08u5Nas532tDFk9sOnJRGe3j3+ElkF9sjqSMhR5CUlBT87ne/Q0VFhU/lR3meh1wuh1arxdq1a/GHP/wBDQ0N4o4OMCQUhShZ99oCNsb3voAuaXetIYxlQYkEuTJuvfVWTJo0CdXV1X7V6PVU+V60aBFWr14dtN7ZNyoY7tL59CNdhO/+LIe+mXpC95WBzJo1CwUFBaisrPSLJBRFIS8vDyaTCbNnz8by5cvFnR0AcMBlVRWP/d9u8L6knPMcIi4JDrrksgsFGkSC/DoWLlyInJwcvyUJz/OQSCTIzc1Fe3s7Hn30Ubz99ts4e/asuNP9QH1nB86dO4d33nkHv/vd7xDWYkMYS64WyRi+m1EukUhQ5+ybeVl9jrJLlizBqFGjYDAY/K624SFKeno6Ojo6sHLlSixatAhbt24NetHj6xGbfzqIv37wPmw2G9LS0hDnZBHfTj6P8e1diHG4vRK/suY8wtKS+uRvlvbFQT322GNISEjA1q1bkZiY6Hf/Bw9RPDlAhw4dwtq1a5GdnY1bbrkFw4cPR3JyssiAa6AjKgJhOi0kzgseJzkLZDQ7UR8TDl6gekRxHDKanZCzPGiahtFoxJi7ClEW7QKcHSJBhOI3v/kNMjIy8MILL+Dmm2/2bnR/QVEUZDIZCgoKwLIs9u3bhyNHjsBisSAnJwfTpk2DXq9HZGSkyIhLYAuXoi4mHNGmX+6CZzbZYY4Mw5lEYfOV1+BAltkBiqJw7NgxvP322zis4lF79rAoQUjRv39/bNy4EYsWLYJMJkNsbGzAfOUcx4GiKKjVavA8j5SUFNjtdvz9739Ha2sr9Ho9NBoNkpOTkZOTg4KCgutqs7tdLp8Ol/NxEcgydyKcuSDVpTwwqK4dDA2cS7g6SbIbOjC43ob25ha43W5s3LgRHeCx/dSuPjtP0r6+kHK5HKtXr8ZHH32E4uJi4uagQhceuHAPXqvVQqvVgmVZNDc3o66uDseOHfN6w2677Ta0tLRg4MCBGDhwoJdkKpVK8Pt8cUCQPmOz2WC1Wr2VGEtKShAbG4u9e/deUJfuHwUoyOvm1KvlONdPgYHGX9QhVReL4QYrVF0MKjQKtEdIf/FIcRyiOhlkWRzo3+CA3diIgoICPP744wCAdTWl2Ndi7LPVHYNavDrQKC4uxvLly6HX6yGRSHo08upZQE8WMcMw4DgO9fX16NevHxITE3Hq1CnExsYiKSkJycnJSEhIQGlpKTQaDaKjo6FWq6HRaGA0GrFx40bBpftbWlpw3333ITExERaLBVarFW1tbbBYLMjPz0dDQwPq6upQX1+PlpYWDBgwAEajEU1NTUhKSgJN095mRp5K+18Mi4c9wrfe4tF2F0ZWtSK57XIp1BYugUUZBmfYBUKHu1hoHW6o7C5UV1dj8eLFXmm8p7kOS88dwVm7b004k+RKHB3zgEiQS/H666+jpqYGiYmJvX7y0DQNjuPAsiykUik4jvP+O8dxXiJ7mpp6/htpX2+n0wmWZUHTNCiK8v7T898kEglomvYWtvb8+685ONbfnOAzQQAgsbUTI6qs0Djc13SQGI1GpKamdmsoWtJuwRsVR7G/1eTzGESCXE3U19fjww8/hMPhQGRkZI9LlFCHvwQBgFSLAwV1NuhsrsukLcuy6OjogEKhwLx585CU9Isb90hrA9bUlGCHpcav94sEEYATJ05gw4YNMJvN0Ol0IVWpPNQJAgDadif619uR0eyAlL8gMUwmE7RaLWbMmIHBgwd7P9vFMtjaZMDautMoajf7/W6RIAQ4fPgwNm/ejK6uLoSHhwtuRC8SxH9IGA7JZjsSGtqgs7OYMWkqxt468oJqyDIwuzpx3NqIHyy12GmpvWqTHpEgQUZFRQU2b96MyspKxMTEQCqVilLlCvhyWAJsCllAv1MKCglyJXThSsT8O/O31d0Fk9OORpcDbj6w12pTwyNxaPRMkSC+Yu3atfj555/hdrsRFxfnV37X9YaNQ+PRqgxtKZurjMauW+8VCeIvTp48iX379uHMmTPeuIVUKgVN0zesYf9DXhyqtYqQ/g2FWj0+KrgjqO+Q3gibYdCgQd5e2jU1Nfjxxx9RWloKi8UCrVaLsLAw4rKooY4Ea1fIE2REdHzQ33FDSJBfQ3V1Naqrq/HTTz/h1KlTUCqViIqKgkQi8QbWJBKJ38mSfRE2uQQ/5saiQR0esuT4W//bkRKhEgnSU3A6ndi9ezdMJhN+/vlnxMTEoKysDOnp6ZDJZN5AnFQqBcuyfjfl7Al4xiiRSLzRf47j4Ha7cZTuhHHMgIB5s3oKSXIllmTdgrsSMkUJ0ptgGAYWiwUtLS04cOAArFYrTCYTTpw4gcGDB0MikcDtdkMqlXoJdHHk3EMoD4koiupGKKFXgi92LvA871UFPe/xvMsToPMQgGEYyGQysCzrHbNOp4Narcbo0aMRGxuL3Uwb/l5binMOa0isSbZCjXlpBZiZmNMj7xMJ4iM4jkN1dTWqqqqgUqlQV1fnzYeKiIiARqOBxWJBa2srHA4H3G6398/lcsHlcqGgoAAMw3iJ4yGPhwQ8z0MqlaK4uBhhYWEICwuDTCbz/ikUCsTExHjf1dnZ6c0DS05Ohs1mQ0ZGBvR6/VWrxhxra8Q2swFHWhvQ7kchhmAiShqGETEJmKpNxy09YHuIBOkhsCzrPdUvPvF5nodCoYDD4UBXVxecTqe3j2N4eDjCw8Mhl8u9n/HkX12ciyWRSETXtUgQESJ6D7Q4BSJEiAQRIUIkiAgRIkFEiBAJIkKESBARIkSCiBAhEkSECJEgIkSIBBEhQoRIEBEihOH/A9ValiWF7GFyAAAAAElFTkSuQmCC';

    constructor(    
        public app: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public sAccount: AccountProvider,
        public sDictionary: DictionaryService,
        public sBreed : BreedProvider,
        public sDog: DogProvider,
        public popevt: Events,
    ) {
        this.user = this.sAccount.getUser();
        let dog = this.navParams.get("dog");
        this.dog = dog;

        //this.dog.date_birth = this._formatdate();
        
        this.languages = this.sDictionary.getLanguages();
        this.preferredLanguage = this.sDictionary.getPreferredLanguage();    


        // Getting breeds
        this.sBreed.getBreeds()
        .then(breeds => {
        this.breeds = breeds;
        console.log("breeds:"+JSON.stringify(this.breeds));
        this.breed = this.breeds[0];
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Settings');
    }

    _formatdate(){
        let d = new Date(this.dog.date_birth);
        return moment(d).format('DD-MM-YYYY');
    }
    
    


    dog_registration() {
        console.log("in dog registration");
        
        
    
            this.dog = new Dog({'name': this.name, 'collarId': this.collarId, 'gender': this.gender, 'age': this.age, 'date_birth': this.date_birth,'breed': this.breed, 'src': this.picture});
            
            this._validateForm().then(() => {

                    const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING") });
                    loading.present();

                    this.sDog.sendDog(this.dog, this.user.token, this.collarId, this.breed.id)
                        .then(() => {
                            loading.dismiss().then(() => {
                                const alert = this.alertCtrl.create({
                                    title: this.sDictionary.get("APP_NAME"),
                                    message: this.sDictionary.get("TEXT_SIGNUP_SUCCESS"),
                                    buttons: [this.sDictionary.get("OK")]
                                });
                                
                                alert.present();
                                alert.onDidDismiss(() => {
                                });
                            });
                        })
                        .catch(msg => {
                            loading.dismiss();
                            this.alertCtrl.create({
                                title: this.sDictionary.get("APP_NAME"),
                                message: msg,
                                buttons: [this.sDictionary.get("OK")]
                            }).present();
                            this.homeRedirection();
                        });
            }).catch(() => {});            
                
    }
    
    takePicture($event) {
        console.log("DogRegistration.takePicture()");
        this.popevt.subscribe('camera:taken', (eventData) => {
          this._managePicture(eventData);
        });
        this.navCtrl.push('CameraPage');
    }

    _managePicture(eventData) {
        console.log("DogRegistration._managePicture()");
        this.popevt.unsubscribe('camera:taken');
        this.picture = eventData;
    }

     homeRedirection() {
        console.log("Redirection to home");
        this.popevt.publish('dog:created', null);
        this.navCtrl.setRoot(HomePage);
        //this.navCtrl.pop();   
    }

    private _validateForm() {
        return new Promise((resolve, reject) => {
            let msg = "";
            let MESSAGE = "WARNING_SIGNUP_FIELD_EMPTY";
            if (this.dog.name.trim() === "") {
                msg = this.sDictionary.get(MESSAGE);
            }

            console.log(this.dog.age);
            if (this.dog.age === -1) {
                msg = this.sDictionary.get(MESSAGE);
            } 

            console.log(this.dog.collarid);
            if (this.dog.collarid === -1) {
                msg = this.sDictionary.get(MESSAGE);
            } 

            if (msg !== "") {
                this.alertCtrl.create({
                    title: this.sDictionary.get("APP_NAME"),
                    message: msg,
                    buttons: [this.sDictionary.get("OK")]
                }).present();
                
                reject();
            } else {
                resolve();
            }
        });
    }
}
