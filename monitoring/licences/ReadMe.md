PQL sample to query licence information 
Only works in domains where the DC acts as main IPAS - typically when using SubIPAS functionality. 
In domains with standalone IPAS, there is no way to execute PQLs on the IPAS and therefore we cannot query license information from outside.
This script need to be executed with System Administrator role.

---
PQL result:
 ![PQL result](/monitoring/licences/GetLicenceStatistics_PQLSET2.png)

---
JSON response via REST API:

![Users per machine](/monitoring/licences/GetLicenceStatistics_JSON.png)
