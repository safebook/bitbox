# Introduction

## Portefeuille hierarchique deterministe

Le portefeuille hierarchique deterministe est un standart cryptographique de fait,

permettant de creer a partir d'une graine unique, une arborescence infinie de secrets.

Il est possible d'exporter seulement un noeud et ses branches.

Dans bitcoin, une graine permet ainsi de creer autant d'addresse que souhaite.

Chaque noeud se compose normalement a la fois d'une addresse bitcoin et de la clef permettant de la depenser. 

Mais il est possible d'exporter seulement l'addresse (la clef publique) et non la clef (privee).
Il sera alors possible de deriver l'arboressence du noeud, mais sans avoir acces au clef privees.

Limitation: Si un noeud est connue seulement pour sa partie publique, et une des clef privee fille est aussi connue, il est trivial de recuperer la clef privee parente.

Mitigation: Lorsqu'on derive un noeud avec la clef privee, on peut faire une derivation protegee. Il n'est plus possible de remonter l'arborescence comme precedemment mais on perd la possibilite de faire la derivation seulement avec l'addresse (clef publique).

C'est une innovation apparue au allentours de 2012, utilisee pour la plupart des portefeuilles bitcoin (et autre altcoins), notament par [electrum](note1), les portefeuille materiels comme trezor ou ledger, et beaucoup d'autres.

(BIP32, Hierarchical deterministic Wallet - HD Wallet) est une innovation apparue au allentours de 2012.

# Motivation

Utiliser BIP32/BIP39 partout !

- Seulement 12 mots a retenir

- Gestionnaire deterministique de mot de passe (web, services, gpg, ipfs...).
- Gestionnaire deterministique de clef de chiffrement (pour des fichiers, des mots de passe, des communications...)
[Note pour plus tard: faire un truc genre ///index-pour-ce-mode/ROOT-DIR/{file-ou-directory}/{file-ou-directory}]


# Implementation

**It should be (retro|backward|)compatible.**

## Extending BIP32 to support arbirary strings in place of the 32bits index: 

Probleme: BIP32 utilise un seulement index sur 32 bits pour determiner le noeud suivant.

L'idee serait de pouvoir utiliser des chaines de caracteres

Plusieurs methodes sont possible

- Add a method to derive using arbitrary long data. Old behavior if called with a 4 bytes encoded number.
- Hashing it and using m/46'/f'/i'/l'/e'/n'/a'/m'/e'
[cf: http://bitcoin-development.narkive.com/9aDCiQpz/bitcoin-development-bip44-gpg-identities-poc-demo]
- Hashing it and only take the first 32 bits of the hash (possibles collisions)

WIF export index is still only use the first 4 bytes of the index.

## Special notation for the hmac result (skipping/before the curve operation)

## ASCII index filtering
- Space till tilde regex in the ascii table `[ -~]+`
- `/[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\]^_`{|}~-]/` with or without quotes

# Hierarchy

## Purpose

m/43'/{app}/{func}/args...

Purpose can be set to 43', app instead of coin type (bip44).

## fs : File system

fs app that generate a hierachy of keys
app fs
func key-of(args)
func content-of(args)

ex: READFILE($account/fs'/default'/filename'/MYFILE
ex: READFILE($account/fs'/default'/filename'/MYDIR/MYFILE


ex: return decrypt(read-content-by-hash(bitbox(fs/filenames/etc/filename)), bitbox(etc/filename)))

## pwd' : deterministic password manager

pwd/account/github/

## cryptocurrency related

use the standart nomenclature

(note1) Electrum est principalement a l'origine de des portefeuilles hierarchiques deterministes [ou alors est-ce BIP39 ?], mais n'est pas 100% compatible avec le standart (BIP32/44/49 avec BIP39) [check]
