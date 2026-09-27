# System Architecture

## Authority model

Human / Creator Authority -> LeeWay Standards -> LeeWay Logistics Product Domain -> Transit Hub Business Authority -> Spatial Fabric / Transit World -> Capability Adapters -> Providers and Local Sensors -> Veritas / Receipts.

Transit Hub owns business truth. Spatial Fabric owns visualization and spatial context. External providers own their published data. LeeWay joins them under tenant and permission controls.

## Truck route authority

Current road visualization uses OSRM car routing. This is a visual/base road path, not a truck-safe route.

Truck route authority must incorporate truck height, width, length, gross weight, axle weight, hazmat, HGV/access restrictions, bridge/tunnel clearances, road class, turn restrictions, terrain/grade, facility approach geometry, weather, traffic, HOS, and appointment windows.

The route gate returns BLOCKED, NO_CONFLICT_FOUND, or UNVERIFIED. NO_CONFLICT_FOUND is not equivalent to VERIFIED_SAFE unless authoritative restriction coverage is proven.

## Public/private split

Public transit and world feeds must not gain access to tenant-private driver identity, customer identity, shipment contents, internal rates, maintenance records, contract documents, private routes, or HR records. Joins happen inside LeeWay.
