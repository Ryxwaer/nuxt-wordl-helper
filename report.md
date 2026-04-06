Delivered-To: ryxwaer@gmail.com
Received: by 2002:a05:612c:6d10:b0:579:94b6:708a with SMTP id 16csp300268vqq;
        Thu, 2 Apr 2026 23:06:48 -0700 (PDT)
X-Received: by 2002:a05:6000:24c9:b0:439:cb3d:e42c with SMTP id ffacd0b85a97d-43d292697d8mr2561499f8f.8.1775196408179;
        Thu, 02 Apr 2026 23:06:48 -0700 (PDT)
ARC-Seal: i=1; a=rsa-sha256; t=1775196408; cv=none;
        d=google.com; s=arc-20240605;
        b=ZrcltZ7U/rW+quZkBVS1HEe8wM5M/xeTzPVKcnr+ZFtFjPf146Mw5l0rMh1Nfj8nFp
         GBoq+DXpizQFwbfCiWra+hSeL/T8SgckTRjloQsPTTVgqOG79dgrlrf5hCLgay6G8t6R
         XopxzlR7GnW/sE9cjrRS/ZxN0VnJ+c1pMCEGkX09zEiVVuCWCrtwELW29oJgfR5Z0q6j
         seRKGcH06WeCStH2pUF4PsaEp360mJMt49Ac+g8UNCBmXklFCacaE69aCVzg3aOuM7T6
         vck55sy632qwC0rgJywuwR9LZEICu0JxFbTAu4ZNeLUKC14NKhqonYXz69OrbbiPDBNT
         6XLg==
ARC-Message-Signature: i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20240605;
        h=date:message-id:subject:to:from:mime-version:sender:dkim-signature
         :dkim-signature;
        bh=SiKCgt2/X5wz6FjLAHWkHjIUrIz1/bSB00Yomo7iA/0=;
        fh=y9XNPXeesyVk3tSmbna7tiYLQJyyl3FJxf0PM+iQOA8=;
        b=Dzbn9qWsOLCFPySzI9rpqjOj3ghOgX/kSjnjBDgBO4ZNajU4waIEMMjb/DP7GgZIMJ
         aG/4N0Ogkb7SfnGaf5Ea+7cVqAkFcPpD8IMyT0cZ63Xf0bITEWOBm3mqTv2qsl7SFRft
         L8SpuQgwEkikUt+AUsfxwRSTqy2uHfqjPr1hePbAIzHhmz1xFcRLZI2htRDDm2j0wKr3
         IW1KVKwytoGikja5wFApxAzC01Vr/IrTqDOPC9tb8bPe0YoKDNQF8zOtnk93cpB08FG1
         wjAEPSqnQcR4Lh9kHj/8J2mzOJZJB/gpNrfbmkXHwyo27bof0u2ib8Hr6X54EVtDHj14
         6f0A==;
        dara=google.com
ARC-Authentication-Results: i=1; mx.google.com;
       dkim=pass header.i=@ryxwaer.com header.s=s1 header.b=vpydsTpn;
       dkim=pass header.i=@eu.mailgun.org header.s=krs2 header.b=qlRTUmdU;
       spf=pass (google.com: domain of bounce+3871fd.3b912-ryxwaer=gmail.com@ryxwaer.com designates 161.38.204.234 as permitted sender) smtp.mailfrom="bounce+3871fd.3b912-ryxwaer=gmail.com@ryxwaer.com";
       dmarc=fail (p=NONE sp=QUARANTINE dis=NONE) header.from=outlook.com
Return-Path: <bounce+3871fd.3b912-ryxwaer=gmail.com@ryxwaer.com>
Received: from v5234.v57ae4e16.euw1.send.eu.mailgun.net (v5234.v57ae4e16.euw1.send.eu.mailgun.net. [161.38.204.234])
        by mx.google.com with UTF8SMTPS id ffacd0b85a97d-43d1e2b325bsi10942265f8f.58.2026.04.02.23.06.47
        for <ryxwaer@gmail.com>
        (version=TLS1_2 cipher=ECDHE-ECDSA-AES128-GCM-SHA256 bits=128/128);
        Thu, 02 Apr 2026 23:06:48 -0700 (PDT)
Received-SPF: pass (google.com: domain of bounce+3871fd.3b912-ryxwaer=gmail.com@ryxwaer.com designates 161.38.204.234 as permitted sender) client-ip=161.38.204.234;
Authentication-Results: mx.google.com;
       dkim=pass header.i=@ryxwaer.com header.s=s1 header.b=vpydsTpn;
       dkim=pass header.i=@eu.mailgun.org header.s=krs2 header.b=qlRTUmdU;
       spf=pass (google.com: domain of bounce+3871fd.3b912-ryxwaer=gmail.com@ryxwaer.com designates 161.38.204.234 as permitted sender) smtp.mailfrom="bounce+3871fd.3b912-ryxwaer=gmail.com@ryxwaer.com";
       dmarc=fail (p=NONE sp=QUARANTINE dis=NONE) header.from=outlook.com
DKIM-Signature: a=rsa-sha256; v=1; c=relaxed/relaxed; d=ryxwaer.com; q=dns/txt; s=s1; t=1775196407; x=1775203607; h=Content-Type: Date: Message-ID: Subject: Subject: To: To: From: From: MIME-Version: Sender: Sender: X-Feedback-Id; bh=SiKCgt2/X5wz6FjLAHWkHjIUrIz1/bSB00Yomo7iA/0=; b=vpydsTpnc8Oj6K6ijiNgEI2ACn4TffxNxQ+xdFM4FdeSNLzUjNzeL6v9VzhTe1nYJbzV0plDSvP/ZrfVJ+1+lFgo8HLWuEokWKgDpiEbRIHDwaX931VZv6WdkXnpaJ+6ScqSOCEFOLET16e1gFCW5Rxu4bhk8KVBQl3wk8cVX9U=
DKIM-Signature: a=rsa-sha256; v=1; c=relaxed/relaxed; d=eu.mailgun.org; q=dns/txt; s=krs2; t=1775196407; x=1775203607; h=Content-Type: Date: Message-ID: Subject: Subject: To: To: From: From: MIME-Version: Sender: Sender: X-Feedback-Id; bh=SiKCgt2/X5wz6FjLAHWkHjIUrIz1/bSB00Yomo7iA/0=; b=qlRTUmdU8xBoBDtJYx1D2+A/cHglonxx/0VdtZnQSteI7mM5JvV3+sehK70qZQpOuXWrXQrBMSGE2grzWRpW1jAFmOKjzNaqNA39r80F7GapyaBQ1FMjZ/eVb6xtN5tAbCamAIRX7KlvN5rnEs//uTZRZ+rw4idoOhINsG8ivrc=
X-Mailgun-Sid: WyJiMmZjMiIsInJ5eHdhZXJAZ21haWwuY29tIiwiM2I5MTIiXQ==
X-Feedback-Id: aaronwolf774@outlook.com::66d23cdaa447d127b1629b2f:mailgun
Received: from mail.ryxwaer.com (adsl-dyn141.78-99-126.t-com.sk [78.99.126.141]) by bf06dafeb23e0638715e92095be4369343100eecd2940f939a8f21b11ae5e9c6 with SMTP id 69cf58f727bedb22fbf0e8cf (version=TLS1.3, cipher=TLS_AES_128_GCM_SHA256); Fri, 03 Apr 2026 06:06:47 GMT
X-Mailgun-Sending-Ip: 161.38.204.234
Sender: aaronwolf774=outlook.com@ryxwaer.com
MIME-Version: 1.0
From: Aaron Wolf <aaronwolf774@outlook.com>
To: <ryxwaer@gmail.com>
Subject: SEO Analysis - wordl.ryxwaer.com - 2026-04-03
Message-ID: <18a2c3ba1e32eb6b.29794fda0f2e6ba4.b0cc84399ca65214@aaron-ubuntu>
Date: Fri, 3 Apr 2026 06:06:47 +0000
Content-Type: multipart/alternative; boundary="18a2c3ba1e32fb44_87a6637288560faa_5f7ca1cd1d111981"

--18a2c3ba1e32fb44_87a6637288560faa_5f7ca1cd1d111981
Content-Type: text/plain; charset="utf-8"
Content-Transfer-Encoding: base64

4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ
4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ
4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ
4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCiAgICAgICAgICAgICAgICAgICAg8J+UjSBEQUlMWSBESUFH
Tk9TVElDUyBSRVBPUlQKICAgICAgICAgICAgICAgICAgICAgICBGcmlkYXksIEFwcmlsIDAzLCAy
MDI2CuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKV
kOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKV
kOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKV
kOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAoKIyDwn5SNIFNFTyBBbmFseXNpcyBSZXBvcnQ6IHdv
cmRsLnJ5eHdhZXIuY29tCgoqKlJlcG9ydCBEYXRlOioqIEFwcmlsIDMsIDIwMjYgIAoqKkFuYWx5
c2lzIFBlcmlvZDoqKiBMYXN0IDcgZGF5cyAoTWFyY2ggMjcgLSBBcHJpbCAzLCAyMDI2KSAgCioq
U2l0ZToqKiBodHRwczovL3dvcmRsLnJ5eHdhZXIuY29tLwoKLS0tCgojIyDwn5OKIEV4ZWN1dGl2
ZSBTdW1tYXJ5Cgp8IE1ldHJpYyB8IFZhbHVlIHwgU3RhdHVzIHwKfC0tLS0tLS0tfC0tLS0tLS18
LS0tLS0tLS18CnwgVG90YWwgQ2xpY2tzIChHU0MpIHwgMTAgfCDwn5+hIExvdyB2b2x1bWUgfAp8
IFRvdGFsIEltcHJlc3Npb25zIHwgMSwyMzUgfCDwn5+iIEdyb3dpbmcgdmlzaWJpbGl0eSB8Cnwg
QXZnIENUUiB8IDAuOCUgfCDwn5S0IE5lZWRzIGltcHJvdmVtZW50IHwKfCBBdmcgUG9zaXRpb24g
fCA1LjIgfCDwn5+hIFJvb20gdG8gaW1wcm92ZSB8CnwgQ2xvdWRmbGFyZSBSZXF1ZXN0cyB8IDMs
NjE5IHwg8J+foiBBY3RpdmUgfAp8IFVuaXF1ZSBWaXNpdG9ycyB8IDI3NiB8IPCfn6EgTG93IGVu
Z2FnZW1lbnQgfAoKLS0tCgojIyAx77iP4oOjIEdvb2dsZSBTZWFyY2ggQ29uc29sZSBJbnNpZ2h0
cwoKIyMjIPCflKUgVG9wIFBlcmZvcm1pbmcgUXVlcmllcwoKfCBRdWVyeSB8IENsaWNrcyB8IElt
cHJlc3Npb25zIHwgQ1RSIHwgUG9zaXRpb24gfAp8LS0tLS0tLXwtLS0tLS0tLXwtLS0tLS0tLS0t
LS0tfC0tLS0tfC0tLS0tLS0tLS18CnwgYmluYW5jZSB3b2RsIHNvbHZlciB8IDIgfCAzMSB8IDYu
NSUgfCA0LjAgfAp8IHdvZGwgc29sdmVyIHwgMSB8IDk0IHwgMS4xJSB8IDMuNyB8Cnwgd29yZGwg
c29sdmVyIHwgMSB8IDQgfCAyNS4wJSB8IDIuMiB8CnwgKip3b2RsKiogfCAqKjAqKiB8ICoqMjkz
KiogfCAqKjAuMCUqKiB8ICoqNy43KiogfAoKKirwn5S0IENSSVRJQ0FMOioqIFRoZSBxdWVyeSAi
d29kbCIgaGFzICoqMjkzIGltcHJlc3Npb25zIHdpdGggMCBjbGlja3MqKi4gVGhpcyBpcyBhIG1h
c3NpdmUgbWlzc2VkIG9wcG9ydHVuaXR5IQotIFlvdSdyZSByYW5raW5nICM3LTggZm9yIGEgaGln
aC12b2x1bWUgdGVybQotIFplcm8gQ1RSIHN1Z2dlc3RzIHdlYWsgdGl0bGUvZGVzY3JpcHRpb24g
b3Igd3JvbmcgaW50ZW50IG1hdGNoCgojIyMg8J+ThCBQYWdlIFBlcmZvcm1hbmNlCgp8IFBhZ2Ug
fCBDbGlja3MgfCBJbXByZXNzaW9ucyB8IENUUiB8IFBvc2l0aW9uIHwKfC0tLS0tLXwtLS0tLS0t
LXwtLS0tLS0tLS0tLS0tfC0tLS0tfC0tLS0tLS0tLS18CnwgLyAoaG9tZXBhZ2UpIHwgNyB8IDUx
NCB8IDEuNCUgfCA2LjEgfAp8IC93b2RsIHwgMiB8IDM4MiB8IDAuNSUgfCA1LjkgfAp8IC9hYm91
dCB8IDAgfCAxMiB8IDAuMCUgfCA2LjkgfAoKIyMjIPCfjI0gR2VvZ3JhcGhpYyBEaXN0cmlidXRp
b24KCioqSGlnaCBDVFIgQ291bnRyaWVzOioqCi0gQm9zbmlhICYgSGVyemVnb3ZpbmEgKEJJSCk6
IDUwJSBDVFIgKDEvMiBjbGlja3MpCi0gSW5kb25lc2lhIChJRE4pOiAyMi4yJSBDVFIgKDIvOSBp
bXByZXNzaW9ucykKLSBGcmFuY2UgKEZSQSk6IDE4LjIlIENUUiAoMi8xMSBpbXByZXNzaW9ucykK
Cioq8J+UtCBDUklUSUNBTCAtIFVTQSBVbmRlcnBlcmZvcm1pbmc6KioKLSAzOTkgaW1wcmVzc2lv
bnMgKDMyJSBvZiB0b3RhbCkgYnV0IG9ubHkgMSBjbGljayAoMC4zJSBDVFIpCi0gUG9zaXRpb24g
Ni42IC0gbmVlZCB0byBpbXByb3ZlIHJhbmtpbmcgKyBtZXRhIHRvIGNhcHR1cmUgdGhpcyB0cmFm
ZmljCgotLS0KCiMjIDLvuI/ig6MgQ2xvdWRmbGFyZSBUcmFmZmljIEFuYWx5dGljcyAoNyBEYXlz
KQoKfCBEYXRlIHwgUmVxdWVzdHMgfCBQYWdlVmlld3MgfCBVbmlxdWVzIHwKfC0tLS0tLXwtLS0t
LS0tLS0tfC0tLS0tLS0tLS0tfC0tLS0tLS0tLXwKfCBNYXIgMjcgfCAxLDY0NiB8IDIgfCA2NSB8
CnwgTWFyIDI4IHwgMzIxIHwgMCB8IDM4IHwKfCBNYXIgMjkgfCAyMjIgfCAwIHwgMzggfAp8IE1h
ciAzMCB8IDMxNyB8IDMgfCAzMiB8CnwgTWFyIDMxIHwgNDYzIHwgMyB8IDQ3IHwKfCBBcHIgMiB8
IDQ1MCB8IDIgfCA1MCB8CnwgQXByIDMgfCAxMDQgfCAwIHwgNiB8CgoqKvCfn6EgV0FSTklORzoq
KiBSZXF1ZXN0LXRvLVBhZ2VWaWV3IHJhdGlvIGlzIGV4dHJlbWVseSBoaWdoICh+MzYyOjEpCi0g
VGhpcyBzdWdnZXN0cyBoZWF2eSBib3QvQVBJIHRyYWZmaWMgdnMgcmVhbCB1c2VycwotIENvbnNp
ZGVyIHJldmlld2luZyBDbG91ZGZsYXJlIGJvdCBtYW5hZ2VtZW50IHNldHRpbmdzCgotLS0KCiMj
IDPvuI/ig6MgVGVjaG5pY2FsIFNFTyBBdWRpdAoKIyMjIPCfn6IgR09PRCAtIEhUVFBTICYgU2Vj
dXJpdHkKLSDinIUgSFRUUC8yIGVuYWJsZWQKLSDinIUgSFNUUyB3aXRoIHByZWxvYWQgKGBtYXgt
YWdlPTYzMDcyMDAwOyBwcmVsb2FkYCkKLSDinIUgVmFsaWQgU1NMIGNlcnRpZmljYXRlCgojIyMg
8J+foiBHT09EIC0gQ3Jhd2xhYmlsaXR5Ci0g4pyFIHJvYm90cy50eHQgcHJvcGVybHkgY29uZmln
dXJlZAotIOKchSBTaXRlbWFwLnhtbCBwcmVzZW50IGFuZCB2YWxpZCAoMyBVUkxzIGluZGV4ZWQp
Ci0g4pyFIEFsbCBrZXkgcGFnZXMgYWxsb3cgY3Jhd2xpbmcKCiMjIyDwn5+hIFdBUk5JTkcgLSBN
ZXRhICYgQ29udGVudAoKKipIb21lcGFnZSBUaXRsZToqKiAiRnJlZSBCaW5hbmNlIFdPREwgU29s
dmVyICYgV29yZGxlIEhlbHBlciIKLSDinIUgR29vZCBrZXl3b3JkIHRhcmdldGluZwotIOKaoO+4
jyBDb25zaWRlciBhZGRpbmcgcG93ZXIgd29yZHMgKCJCZXN0IiwgIiMxIiwgIjIwMjYiKQoKKipX
T0RMIFBhZ2UgVGl0bGU6KiogIlRvZGF5J3MgV09ETCBUaGVtZTogQUkgVHJhZGluZyIKLSDwn5S0
ICoqQ1JJVElDQUw6KiogVGl0bGUgY2hhbmdlcyBkYWlseSBidXQgbGFja3MgInNvbHZlciIga2V5
d29yZAotIE1pc3Npbmcgb3Bwb3J0dW5pdHkgZm9yICJiaW5hbmNlIHdvZGwgc29sdmVyIHRvZGF5
IgoKKipBYm91dCBQYWdlIFRpdGxlOioqICJIb3cgdG8gVXNlIFdvcmRsZSBIZWxwZXIgJiBCaW5h
bmNlIFdPREwgU29sdmVyIgotIOKchSBHb29kIGRlc2NyaXB0aXZlIHRpdGxlCgojIyMg8J+UtCBD
UklUSUNBTCAtIFNpdGVtYXAgRnJlc2huZXNzCi0gU2l0ZW1hcCBgbGFzdG1vZGAgZGF0ZXMgYXJl
ICoqMjAyNi0wMi0wOSoqICg1NCBkYXlzIG9sZCkKLSBTZWFyY2ggZW5naW5lcyBtYXkgbm90IHJl
Y3Jhd2wgZnJlcXVlbnRseSBpZiBkYXRlcyBhcmUgc3RhbGUKCiMjIyDwn5+hIFdBUk5JTkcgLSBN
aXNzaW5nIFN0cnVjdHVyZWQgRGF0YQotIE5vIFNjaGVtYS5vcmcgbWFya3VwIGRldGVjdGVkIChG
QVEsIEhvd1RvLCBTb2Z0d2FyZUFwcGxpY2F0aW9uKQotIFJpY2ggc25pcHBldHMgY291bGQgaW1w
cm92ZSBDVFIgc2lnbmlmaWNhbnRseQoKLS0tCgojIyA077iP4oOjIENvbnRlbnQgQW5hbHlzaXMK
CiMjIyBIZWFkaW5nIFN0cnVjdHVyZQoKKipIb21lcGFnZToqKgotIEgxOiAiTXkgQmluYW5jZSBX
T0RMIFNvbHZlciIg4pyFCi0gQ29udGVudCBleHBsYWlucyB0aGUgdG9vbCB3ZWxsCi0gSW50ZXJu
YWwgbGlua3MgdG8gL3dvZGwsIC9hYm91dCwgL3BvbGljeSDinIUKCioqV09ETCBQYWdlOioqCi0g
SDI6ICJXaGF0IGlzIEJpbmFuY2UgV09ETD8iIOKchQotIEgyOiAiVG9kYXkncyBCaW5hbmNlIFdP
REwgVGhlbWUiIOKchQotIEgyOiAiSG93IHRvIFVzZSBNeSBCaW5hbmNlIFdPREwgU29sdmVyIiDi
nIUKLSBEeW5hbWljIHRoZW1lIGNvbnRlbnQgKEFJIFRyYWRpbmcpIGlzIGZyZXNoIPCflIQKCioq
QWJvdXQgUGFnZToqKgotIEgyOiAiV2hhdCBpcyBXb3JkbGU/IiDinIUKLSBIMjogIlVzaW5nIHRo
ZSBIZWxwZXI6IFN0ZXAtYnktU3RlcCIg4pyFCi0gSDI6ICJXaGF0IFRoaXMgSGVscGVyIERvZXMg
Rm9yIFlvdSIg4pyFCgojIyMg8J+SoSBTVUdHRVNUSU9OIC0gQ29udGVudCBPcHBvcnR1bml0aWVz
CgoxLiAqKkFkZCBGQVEgU2VjdGlvbioqIC0gVGFyZ2V0ICJ3aGF0IGlzIHdvZGwiLCAiaG93IHRv
IHBsYXkgYmluYW5jZSB3b2RsIgoyLiAqKkNyZWF0ZSBCbG9nL05ld3MgU2VjdGlvbioqIC0gRGFp
bHkgV09ETCBhbnN3ZXJzIGJyaW5nIHJlY3VycmluZyB0cmFmZmljCjMuICoqQWRkIFZpZGVvIFR1
dG9yaWFsKiogLSBFbWJlZCBZb3VUdWJlIGZvciAiaG93IHRvIHVzZSIgcXVlcmllcwo0LiAqKldv
cmQgTGlzdHMqKiAtIENyZWF0ZSBwYWdlcyBmb3IgIjUgbGV0dGVyIHdvcmRzIHN0YXJ0aW5nIHdp
dGggWCIKCi0tLQoKIyMgNe+4j+KDoyBBY3Rpb24gSXRlbXMgKFByaW9yaXRpemVkKQoKIyMjIPCf
lLQgQ1JJVElDQUwgKERvIFRoaXMgV2VlaykKCjEuICoqRml4IFNpdGVtYXAgRGF0ZXMqKiAtIFVw
ZGF0ZSBgbGFzdG1vZGAgdG8gY3VycmVudCBkYXRlIG9uIGVhY2ggZGVwbG95CjIuICoqT3B0aW1p
emUgZm9yICJ3b2RsIiBRdWVyeSoqIC0gMjkzIGltcHJlc3Npb25zLCAwIGNsaWNrcyBpcyB1bmFj
Y2VwdGFibGUKICAgLSBJbXByb3ZlIHRpdGxlOiAiV09ETCBTb2x2ZXIgfCBCaW5hbmNlIFdvcmRs
ZSBIZWxwZXIgMjAyNiIKICAgLSBBZGQgbWV0YSBkZXNjcmlwdGlvbiB3aXRoIGNhbGwtdG8tYWN0
aW9uCjMuICoqQWRkIFNjaGVtYSBNYXJrdXAqKiAtIFNvZnR3YXJlQXBwbGljYXRpb24gc2NoZW1h
IGZvciB0aGUgc29sdmVyIHRvb2wKCiMjIyDwn5+hIFdBUk5JTkcgKERvIFRoaXMgTW9udGgpCgo0
LiAqKlVTQSBUcmFmZmljIEZpeCoqIC0gMC4zJSBDVFIgZnJvbSAzOTkgaW1wcmVzc2lvbnMgbmVl
ZHMgYXR0ZW50aW9uCiAgIC0gQS9CIHRlc3QgdGl0bGVzIHdpdGggVVMgc3BlbGxpbmcgKCJzb2x2
ZXIiIHZzICJoZWxwZXIiKQo1LiAqKldPREwgUGFnZSBTRU8qKiAtIEFkZCBzdGF0aWMgY29udGVu
dCB0aGF0IGRvZXNuJ3QgY2hhbmdlIGRhaWx5CjYuICoqSW50ZXJuYWwgTGlua2luZyoqIC0gTGlu
ayBmcm9tIGFib3V0IOKGkiB3b2RsIG1vcmUgcHJvbWluZW50bHkKCiMjIyDwn5KhIFNVR0dFU1RJ
T04gKE5pY2UgdG8gSGF2ZSkKCjcuICoqRkFRIFNjaGVtYSoqIC0gQWRkIHN0cnVjdHVyZWQgRkFR
IGRhdGEgdG8gdGhlIEFib3V0IHBhZ2UKOC4gKipTb2NpYWwgTWV0YSBUYWdzKiogLSBBZGQgT3Bl
biBHcmFwaCBhbmQgVHdpdHRlciBDYXJkIG1ldGEgdGFncwo5LiAqKkNvcmUgV2ViIFZpdGFscyoq
IC0gTW9uaXRvciBMQ1AsIEZJRCwgQ0xTIGluIFNlYXJjaCBDb25zb2xlCjEwLiAqKkJhY2tsaW5r
IEJ1aWxkaW5nKiogLSBSZWFjaCBvdXQgdG8gY3J5cHRvL1dvcmRsZSBjb21tdW5pdGllcwoKLS0t
CgojIyDwn5OIIFF1aWNrIFdpbnMgU3VtbWFyeQoKfCBBY3Rpb24gfCBFeHBlY3RlZCBJbXBhY3Qg
fCBFZmZvcnQgfAp8LS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS18CnwgVXBkYXRl
IHNpdGVtYXAgZGF0ZXMgfCBIaWdoZXIgY3Jhd2wgcmF0ZSB8IDE1IG1pbiB8CnwgQWRkIFNjaGVt
YSBtYXJrdXAgfCBSaWNoIHNuaXBwZXRzIHwgMzAgbWluIHwKfCBSZXdyaXRlIG1ldGEgZGVzY3Jp
cHRpb25zIHwgKzItMyUgQ1RSIHwgMjAgbWluIHwKfCBUYXJnZXQgIndvZGwiIGtleXdvcmQgfCAr
NTAtMTAwIGNsaWNrcy9tbyB8IDEgaG91ciB8CgotLS0KCipSZXBvcnQgZ2VuZXJhdGVkIGJ5IEFh
cm9uIFdvbGYg8J+QuiB8IE9wZW5DbGF3IFNFTyBBbmFseXNpcyBBZ2VudCoKCuKUgOKUgOKUgOKU
gOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKU
gOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKU
gOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKU
gOKUgOKUgOKUgApHZW5lcmF0ZWQgYnkgQWFyb24gV29sZiDwn5C6IHwgT3BlbkNsYXcgRGlhZ25v
c3RpY3MgQWdlbnQK4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA
4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA
4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA
4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSACg==
--18a2c3ba1e32fb44_87a6637288560faa_5f7ca1cd1d111981
Content-Type: text/html; charset="utf-8"
Content-Transfer-Encoding: quoted-printable

<!DOCTYPE html>
<html>
<head>
<meta charset=3D"utf-8">
<style>
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'He=
lvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: #f9f9f9;
}
.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    border-radius: 10px 10px 0 0;
    text-align: center;
    margin: -20px -20px 20px -20px;
}
.header h1 { margin: 0; font-size: 24px; }
.header .date { opacity: 0.9; margin-top: 5px; }
.content {
    background: white;
    padding: 25px;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
h1, h2, h3 { color: #2d3748; }
h2 { border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-top: 30p=
x; }
code {
    background: #f1f5f9;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'SF Mono', Monaco, 'Courier New', monospace;
    font-size: 0.9em;
}
pre {
    background: #1e293b;
    color: #e2e8f0;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
}
pre code { background: none; color: inherit; }
ul, ol { padding-left: 25px; }
li { margin: 8px 0; }
.footer {
    text-align: center;
    color: #718096;
    font-size: 0.85em;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #e2e8f0;
}
/* Severity colors */
.content li:has(strong:first-child) { list-style: none; margin-left: -20px;=
 }
</style>
</head>
<body>
<div class=3D"header">
    <h1>=F0=9F=94=8D Daily Diagnostics Report</h1>
    <div class=3D"date">Friday, April 03, 2026</div>
</div>
<div class=3D"content">
<h1 id=3D"seo-analysis-report-wordl.ryxwaer.com">=F0=9F=94=8D SEO Analysis =
Report:
wordl.ryxwaer.com</h1>
<p><strong>Report Date:</strong> April 3, 2026<br />
<strong>Analysis Period:</strong> Last 7 days (March 27 - April 3,
2026)<br />
<strong>Site:</strong> https://wordl.ryxwaer.com/</p>
<hr />
<h2 id=3D"executive-summary">=F0=9F=93=8A Executive Summary</h2>
<table>
<thead>
<tr class=3D"header">
<th>Metric</th>
<th>Value</th>
<th>Status</th>
</tr>
</thead>
<tbody>
<tr class=3D"odd">
<td>Total Clicks (GSC)</td>
<td>10</td>
<td>=F0=9F=9F=A1 Low volume</td>
</tr>
<tr class=3D"even">
<td>Total Impressions</td>
<td>1,235</td>
<td>=F0=9F=9F=A2 Growing visibility</td>
</tr>
<tr class=3D"odd">
<td>Avg CTR</td>
<td>0.8%</td>
<td>=F0=9F=94=B4 Needs improvement</td>
</tr>
<tr class=3D"even">
<td>Avg Position</td>
<td>5.2</td>
<td>=F0=9F=9F=A1 Room to improve</td>
</tr>
<tr class=3D"odd">
<td>Cloudflare Requests</td>
<td>3,619</td>
<td>=F0=9F=9F=A2 Active</td>
</tr>
<tr class=3D"even">
<td>Unique Visitors</td>
<td>276</td>
<td>=F0=9F=9F=A1 Low engagement</td>
</tr>
</tbody>
</table>
<hr />
<h2 id=3D"google-search-console-insights">1=EF=B8=8F=E2=83=A3 Google Search=
 Console
Insights</h2>
<h3 id=3D"top-performing-queries">=F0=9F=94=A5 Top Performing Queries</h3>
<table>
<thead>
<tr class=3D"header">
<th>Query</th>
<th>Clicks</th>
<th>Impressions</th>
<th>CTR</th>
<th>Position</th>
</tr>
</thead>
<tbody>
<tr class=3D"odd">
<td>binance wodl solver</td>
<td>2</td>
<td>31</td>
<td>6.5%</td>
<td>4.0</td>
</tr>
<tr class=3D"even">
<td>wodl solver</td>
<td>1</td>
<td>94</td>
<td>1.1%</td>
<td>3.7</td>
</tr>
<tr class=3D"odd">
<td>wordl solver</td>
<td>1</td>
<td>4</td>
<td>25.0%</td>
<td>2.2</td>
</tr>
<tr class=3D"even">
<td><strong>wodl</strong></td>
<td><strong>0</strong></td>
<td><strong>293</strong></td>
<td><strong>0.0%</strong></td>
<td><strong>7.7</strong></td>
</tr>
</tbody>
</table>
<p><strong>=F0=9F=94=B4 CRITICAL:</strong> The query =E2=80=9Cwodl=E2=80=9D=
 has <strong>293
impressions with 0 clicks</strong>. This is a massive missed
opportunity! - You=E2=80=99re ranking #7-8 for a high-volume term - Zero CT=
R
suggests weak title/description or wrong intent match</p>
<h3 id=3D"page-performance">=F0=9F=93=84 Page Performance</h3>
<table>
<thead>
<tr class=3D"header">
<th>Page</th>
<th>Clicks</th>
<th>Impressions</th>
<th>CTR</th>
<th>Position</th>
</tr>
</thead>
<tbody>
<tr class=3D"odd">
<td>/ (homepage)</td>
<td>7</td>
<td>514</td>
<td>1.4%</td>
<td>6.1</td>
</tr>
<tr class=3D"even">
<td>/wodl</td>
<td>2</td>
<td>382</td>
<td>0.5%</td>
<td>5.9</td>
</tr>
<tr class=3D"odd">
<td>/about</td>
<td>0</td>
<td>12</td>
<td>0.0%</td>
<td>6.9</td>
</tr>
</tbody>
</table>
<h3 id=3D"geographic-distribution">=F0=9F=8C=8D Geographic Distribution</h3=
>
<p><strong>High CTR Countries:</strong> - Bosnia &amp; Herzegovina
(BIH): 50% CTR (1/2 clicks) - Indonesia (IDN): 22.2% CTR (2/9
impressions) - France (FRA): 18.2% CTR (2/11 impressions)</p>
<p><strong>=F0=9F=94=B4 CRITICAL - USA Underperforming:</strong> - 399 impr=
essions
(32% of total) but only 1 click (0.3% CTR) - Position 6.6 - need to
improve ranking + meta to capture this traffic</p>
<hr />
<h2 id=3D"cloudflare-traffic-analytics-7-days">2=EF=B8=8F=E2=83=A3 Cloudfla=
re Traffic
Analytics (7 Days)</h2>
<table>
<thead>
<tr class=3D"header">
<th>Date</th>
<th>Requests</th>
<th>PageViews</th>
<th>Uniques</th>
</tr>
</thead>
<tbody>
<tr class=3D"odd">
<td>Mar 27</td>
<td>1,646</td>
<td>2</td>
<td>65</td>
</tr>
<tr class=3D"even">
<td>Mar 28</td>
<td>321</td>
<td>0</td>
<td>38</td>
</tr>
<tr class=3D"odd">
<td>Mar 29</td>
<td>222</td>
<td>0</td>
<td>38</td>
</tr>
<tr class=3D"even">
<td>Mar 30</td>
<td>317</td>
<td>3</td>
<td>32</td>
</tr>
<tr class=3D"odd">
<td>Mar 31</td>
<td>463</td>
<td>3</td>
<td>47</td>
</tr>
<tr class=3D"even">
<td>Apr 2</td>
<td>450</td>
<td>2</td>
<td>50</td>
</tr>
<tr class=3D"odd">
<td>Apr 3</td>
<td>104</td>
<td>0</td>
<td>6</td>
</tr>
</tbody>
</table>
<p><strong>=F0=9F=9F=A1 WARNING:</strong> Request-to-PageView ratio is extr=
emely
high (~362:1) - This suggests heavy bot/API traffic vs real users -
Consider reviewing Cloudflare bot management settings</p>
<hr />
<h2 id=3D"technical-seo-audit">3=EF=B8=8F=E2=83=A3 Technical SEO Audit</h2>
<h3 id=3D"good---https-security">=F0=9F=9F=A2 GOOD - HTTPS &amp; Security</=
h3>
<ul>
<li>=E2=9C=85 HTTP/2 enabled</li>
<li>=E2=9C=85 HSTS with preload (<code>max-age=3D63072000; preload</code>)<=
/li>
<li>=E2=9C=85 Valid SSL certificate</li>
</ul>
<h3 id=3D"good---crawlability">=F0=9F=9F=A2 GOOD - Crawlability</h3>
<ul>
<li>=E2=9C=85 robots.txt properly configured</li>
<li>=E2=9C=85 Sitemap.xml present and valid (3 URLs indexed)</li>
<li>=E2=9C=85 All key pages allow crawling</li>
</ul>
<h3 id=3D"warning---meta-content">=F0=9F=9F=A1 WARNING - Meta &amp; Content=
</h3>
<p><strong>Homepage Title:</strong> =E2=80=9CFree Binance WODL Solver &amp;
Wordle Helper=E2=80=9D - =E2=9C=85 Good keyword targeting - =E2=9A=A0=EF=B8=
=8F Consider adding power
words (=E2=80=9CBest=E2=80=9D, =E2=80=9C#1=E2=80=9D, =E2=80=9C2026=E2=80=9D=
)</p>
<p><strong>WODL Page Title:</strong> =E2=80=9CToday=E2=80=99s WODL Theme: A=
I Trading=E2=80=9D -
=F0=9F=94=B4 <strong>CRITICAL:</strong> Title changes daily but lacks =E2=
=80=9Csolver=E2=80=9D
keyword - Missing opportunity for =E2=80=9Cbinance wodl solver today=E2=80=
=9D</p>
<p><strong>About Page Title:</strong> =E2=80=9CHow to Use Wordle Helper &am=
p;
Binance WODL Solver=E2=80=9D - =E2=9C=85 Good descriptive title</p>
<h3 id=3D"critical---sitemap-freshness">=F0=9F=94=B4 CRITICAL - Sitemap
Freshness</h3>
<ul>
<li>Sitemap <code>lastmod</code> dates are <strong>2026-02-09</strong>
(54 days old)</li>
<li>Search engines may not recrawl frequently if dates are stale</li>
</ul>
<h3 id=3D"warning---missing-structured-data">=F0=9F=9F=A1 WARNING - Missing
Structured Data</h3>
<ul>
<li>No Schema.org markup detected (FAQ, HowTo, SoftwareApplication)</li>
<li>Rich snippets could improve CTR significantly</li>
</ul>
<hr />
<h2 id=3D"content-analysis">4=EF=B8=8F=E2=83=A3 Content Analysis</h2>
<h3 id=3D"heading-structure">Heading Structure</h3>
<p><strong>Homepage:</strong> - H1: =E2=80=9CMy Binance WODL Solver=E2=80=
=9D =E2=9C=85 -
Content explains the tool well - Internal links to /wodl, /about,
/policy =E2=9C=85</p>
<p><strong>WODL Page:</strong> - H2: =E2=80=9CWhat is Binance WODL?=E2=80=
=9D =E2=9C=85 - H2:
=E2=80=9CToday=E2=80=99s Binance WODL Theme=E2=80=9D =E2=9C=85 - H2: =E2=80=
=9CHow to Use My Binance WODL
Solver=E2=80=9D =E2=9C=85 - Dynamic theme content (AI Trading) is fresh =F0=
=9F=94=84</p>
<p><strong>About Page:</strong> - H2: =E2=80=9CWhat is Wordle?=E2=80=9D =E2=
=9C=85 - H2: =E2=80=9CUsing
the Helper: Step-by-Step=E2=80=9D =E2=9C=85 - H2: =E2=80=9CWhat This Helper=
 Does For You=E2=80=9D
=E2=9C=85</p>
<h3 id=3D"suggestion---content-opportunities">=F0=9F=92=A1 SUGGESTION - Con=
tent
Opportunities</h3>
<ol type=3D"1">
<li><strong>Add FAQ Section</strong> - Target =E2=80=9Cwhat is wodl=E2=80=
=9D, =E2=80=9Chow to
play binance wodl=E2=80=9D</li>
<li><strong>Create Blog/News Section</strong> - Daily WODL answers bring
recurring traffic</li>
<li><strong>Add Video Tutorial</strong> - Embed YouTube for =E2=80=9Chow to=
 use=E2=80=9D
queries</li>
<li><strong>Word Lists</strong> - Create pages for =E2=80=9C5 letter words
starting with X=E2=80=9D</li>
</ol>
<hr />
<h2 id=3D"action-items-prioritized">5=EF=B8=8F=E2=83=A3 Action Items (Prior=
itized)</h2>
<h3 id=3D"critical-do-this-week">=F0=9F=94=B4 CRITICAL (Do This Week)</h3>
<ol type=3D"1">
<li><strong>Fix Sitemap Dates</strong> - Update <code>lastmod</code> to
current date on each deploy</li>
<li><strong>Optimize for =E2=80=9Cwodl=E2=80=9D Query</strong> - 293 impres=
sions, 0
clicks is unacceptable
<ul>
<li>Improve title: =E2=80=9CWODL Solver | Binance Wordle Helper 2026=E2=80=
=9D</li>
<li>Add meta description with call-to-action</li>
</ul></li>
<li><strong>Add Schema Markup</strong> - SoftwareApplication schema for
the solver tool</li>
</ol>
<h3 id=3D"warning-do-this-month">=F0=9F=9F=A1 WARNING (Do This Month)</h3>
<ol start=3D"4" type=3D"1">
<li><strong>USA Traffic Fix</strong> - 0.3% CTR from 399 impressions
needs attention
<ul>
<li>A/B test titles with US spelling (=E2=80=9Csolver=E2=80=9D vs =E2=80=9C=
helper=E2=80=9D)</li>
</ul></li>
<li><strong>WODL Page SEO</strong> - Add static content that doesn=E2=80=99=
t
change daily</li>
<li><strong>Internal Linking</strong> - Link from about =E2=86=92 wodl more
prominently</li>
</ol>
<h3 id=3D"suggestion-nice-to-have">=F0=9F=92=A1 SUGGESTION (Nice to Have)</=
h3>
<ol start=3D"7" type=3D"1">
<li><strong>FAQ Schema</strong> - Add structured FAQ data to the About
page</li>
<li><strong>Social Meta Tags</strong> - Add Open Graph and Twitter Card
meta tags</li>
<li><strong>Core Web Vitals</strong> - Monitor LCP, FID, CLS in Search
Console</li>
<li><strong>Backlink Building</strong> - Reach out to crypto/Wordle
communities</li>
</ol>
<hr />
<h2 id=3D"quick-wins-summary">=F0=9F=93=88 Quick Wins Summary</h2>
<table>
<thead>
<tr class=3D"header">
<th>Action</th>
<th>Expected Impact</th>
<th>Effort</th>
</tr>
</thead>
<tbody>
<tr class=3D"odd">
<td>Update sitemap dates</td>
<td>Higher crawl rate</td>
<td>15 min</td>
</tr>
<tr class=3D"even">
<td>Add Schema markup</td>
<td>Rich snippets</td>
<td>30 min</td>
</tr>
<tr class=3D"odd">
<td>Rewrite meta descriptions</td>
<td>+2-3% CTR</td>
<td>20 min</td>
</tr>
<tr class=3D"even">
<td>Target =E2=80=9Cwodl=E2=80=9D keyword</td>
<td>+50-100 clicks/mo</td>
<td>1 hour</td>
</tr>
</tbody>
</table>
<hr />
<p><em>Report generated by Aaron Wolf =F0=9F=90=BA | OpenClaw SEO Analysis
Agent</em></p>
</div>
<div class=3D"footer">
    Generated by Aaron Wolf =F0=9F=90=BA | OpenClaw Diagnostics Agent
</div>
</body>
</html>

--18a2c3ba1e32fb44_87a6637288560faa_5f7ca1cd1d111981--