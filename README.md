node-red-contrib-observertc
========================
A collection of <a href="http://nodered.org" target="_new">Node-RED</a> nodes for <a href="http://observertc.org/" target="_new">ObserveRTC</a>.

Nodes 
-----------------
* report-demuxer


Payload returned from [observer](https://github.com/ObserveRTC/observer) are [reports](https://github.com/ObserveRTC/schemas-2.0/tree/main/generated-schemas/reports/v3).

Usage
---
WebRTC reports are read from a buffer / database from which reports are further processed. 

![](screenshot.png?raw=true)

License
-------

See [license] (https://github.com/ObserveRTC/node-red-contrib-observertc) (Apache License Version 2.0).

Contributions
----

If you want to add a new node to this library, here's some pointers.
 - Make sure you make a PR, and add tests to your node.
 - One PR can only contains one node.

How to build nodes:

1. Develop and test the node
2. update package.json by adding the new node
3. Please submit a PR with the name of your node (e.g.: my_github_username/my-developed-node-name) and let me know how extensively its been tested.


