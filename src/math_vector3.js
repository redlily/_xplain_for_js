/**
 * @license
 *
 * Copyright (c) 2015, Syuuhei Kuno
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *  2. Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder nor the names of its contributors
 *     may be used to endorse or promote products derived from this software
 *     without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function (ns) {

    "use strict";

    let VX = 0, VY = 1, VZ = 2;
    let CR = 0, CI = 1, CJ = 2, CK = 3;
    let M00 = 0, M01 = 4, M02 = 8, M03 = 12,
        M10 = 1, M11 = 5, M12 = 9, M13 = 13,
        M20 = 2, M21 = 6, M22 = 10, M23 = 14,
        M30 = 3, M31 = 7, M32 = 11, M33 = 15;

    /**
     * Vector utilities of three dimensions.
     *
     * @namespace xpl.Vector3
     * @author Syuuhei Kuno
     */
    ns.Vector3 = function () {
        throw new Error("Unsupported operation!");
    };

    /**
     * Load the any values that to elements of a vector.
     *
     * @memberof xpl.Vector3
     * @function load
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Number} x - X element of the source vector.
     * @param {Number} y - Y element of the source vector.
     * @param {Number} z - Z element of the source vector.
     */
    ns.Vector3.load = function (d, d_off, x, y, z) {
        d[d_off + VX] = x;
        d[d_off + VY] = y;
        d[d_off + VZ] = z;
    };

    /**
     * Load the any values that to elements of a vector.
     *
     * @memberof xpl.Vector3
     * @function loadv
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Array.<Number>} v - The source vector.
     * @param {Number} v_off - Starting position in the source vector.
     */
    ns.Vector3.loadv = function (d, d_off, v, v_off) {
        ns.Vector3.load(d, d_off, v[v_off + VX], v[v_off + VY], v[v_off + VZ]);
    };

    /**
     * Load the zero values at elements of a vector.
     *
     * @memberof xpl.Vector3
     * @function loadZero
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     */
    ns.Vector3.loadZero = function (d, d_off) {
        ns.Vector3.load(d, d_off, 0, 0, 0);
    };

    /**
     * Calculate square length of a vector.
     *
     * @memberof xpl.Vector3
     * @function lenSq
     * @param {Array.<Number>} v - The target vector.
     * @param {Number} v_off - Starting position in the target vector.
     * @returns {Number} The squared length of the target vector.
     */
    ns.Vector3.lenSq = function (v, v_off) {
        let x = v[v_off + VX];
        let y = v[v_off + VY];
        let z = v[v_off + VZ];
        return x * x + y * y + z * z;
    };

    /**
     * Calculate length of the vector.
     *
     * @memberof xpl.Vector3
     * @function len
     * @param {Array.<Number>} v - The target vector.
     * @param {Number} v_off - Starting position in the target vector.
     * @returns {Number} The length of the target vector.
     */
    ns.Vector3.len = function (v, v_off) {
        return Math.sqrt(ns.Vector3.lenSq(v, v_off));
    };

    /**
     * Normalize a vector.
     *
     * @memberof xpl.Vector3
     * @function normalizev
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Array.<Number>} v - The target vector.
     * @param {Number} v_off - Starting position in the target vector.
     */
    ns.Vector3.normalizev = function (d, d_off, v, v_off) {
        let x = v[v_off + VX];
        let y = v[v_off + VY];
        let z = v[v_off + VZ];
        let len = x * x + y * y + z * z;
        if (0 < len) {
            len = Math.sqrt(len);
            ns.Vector3.load(d, d_off, x / len, y / len, z / len);
        } else {
            ns.Vector3.loadZero(d, d_off);
        }
    };

    /**
     * Linear interpolate any two vectors then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function lerp
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Number} x1 - X-axis element of the start point vector.
     * @param {Number} y1 - Y-axis element of the start point vector.
     * @param {Number} z1 - Z-axis element of the start point vector.
     * @param {Number} x2 - X-axis element of the end point vector.
     * @param {Number} y2 - Y-axis element of the end point vector.
     * @param {Number} z2 - Z-axis element of the end point vector.
     * @param {Number} t - The interpolation coefficient.
     */
    ns.Vector3.lerp = function (d, d_off, x1, y1, z1, x2, y2, z2, t) {
        let t1 = 1.0 - t;
        ns.Vector3.load(d, d_off, x1 * t1 + x2 * t, y1 * t1 + y2 * t, z1 * t1 + z2 * t);
    };

    /**
     * Linear interpolate any two vectors then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function lerpv
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Array.<Number>} v1 - The start point vector.
     * @param {Number} v1_off - Starting position in the start point vector.
     * @param {Array.<Number>} v2 - The end point vector.
     * @param {Number} v2_off - Starting position int the end point vector.
     * @param {Number} t - The interpolation coefficient.
     */
    ns.Vector3.lerpv = function (d, d_off, v1, v1_off, v2, v2_off, t) {
        ns.Vector3.lerp(
            d, d_off,
            v1[v1_off + VX], v1[v1_off + VY], v1[v1_off + VZ],
            v2[v2_off + VX], v2[v2_off + VY], v2[v2_off + VZ],
            t);
    };

    /**
     * Spherical linear interpolate any two vectors then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function slerp
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Number} x1 - X-axis element of the start point vector.
     * @param {Number} y1 - Y-axis element of the start point vector.
     * @param {Number} z1 - Z-axis element of the start point vector.
     * @param {Number} x2 - X-axis element of the end point vector.
     * @param {Number} y2 - Y-axis element of the end point vector.
     * @param {Number} z2 - Z-axis element of the end point vector.
     * @param {Number} t - The interpolation coefficient.
     */
    ns.Vector3.slerp = function (d, d_off, x1, y1, z1, x2, y2, z2, t) {
        // normalize a start point vector.
        let len1 = x1 * x1 + y1 * y1 + z1 * z1;
        if (0 < len1) {
            len1 = Math.sqrt(len1);
            x1 /= len1;
            y1 /= len1;
            z1 /= len1;
        }

        // normalize a end point vector.
        let len2 = x2 * x2 + y2 * y2 + z2 * z2;
        if (0 < len2) {
            len2 = Math.sqrt(len2);
            x2 /= len2;
            y2 /= len2;
            z2 /= len2;
        }

        // calculate cosine value from two vectors.
        let cs = x1 * x2 + y1 * y2 + z1 * z2;

        if (1.0 <= cs) {
            // two vectors are the same direction.
            let len = len1 * (1.0 - t) + len2 * t;
            ns.Vector3.load(d, d_off, x1 * len, y1 * len, z1 * len);
        } else if (cs <= -1.0) {
            // two vectors are the reverse direction.
            let len = len1 * (1.0 - t) - len2 * t;
            ns.Vector3.load(d, d_off, x1 * len, y1 * len, z1 * len);
        } else {
            // other conditions.

            // linear interpolate the absolute value.
            // lerp(p0, p1; t) = (1.0 - t) * p0 + t * p1
            let len = len1 * (1.0 - t) + len2 * t;

            // spherical linear interpolate the direction.
            // slerp(p0, p1; t) = (sin((1.0 - t) * Ω) / sin(Ω)) * p0 + (sin(t * Ω) / sin(Ω)) * p1
            let rad1 = Math.acos(cs);
            let rad2 = rad1 * (1.0 - t);
            let rad3 = rad1 * t;
            let sn = Math.sin(rad1);
            let sn1 = Math.sin(rad2) / sn;
            let sn2 = Math.sin(rad3) / sn;

            // load to a destination vector.
            ns.Vector3.load(
                d, d_off,
                (x1 * sn1 + x2 * sn2) * len,
                (y1 * sn1 + y2 * sn2) * len,
                (z1 * sn1 + z2 * sn2) * len);
        }
    };

    /**
     * Spherical linear interpolate any two vector then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function slerpv
     * @param {Array.<Number>}  d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Array.<Number>}  v1 - The start point vector.
     * @param {Number} v1_off - Starting position in the start point vector.
     * @param {Array.<Number>}  v2 - The end point vector.
     * @param {Number} v2_off - Starting position int the end point vector.
     * @param {Number} t - The interpolation coefficient.
     */
    ns.Vector3.slerpv = function (d, d_off, v1, v1_off, v2, v2_off, t) {
        ns.Vector3.slerp(
            d, d_off,
            v1[v1_off + VX], v1[v1_off + VY], v1[v1_off + VZ],
            v2[v2_off + VX], v2[v2_off + VY], v2[v2_off + VZ],
            t);
    };

    /**
     * Calculate dot value.
     *
     * @memberof xpl.Vector3
     * @function dot
     * @param {Number} x1 - X-axis element of the left-hand side vector of operator.
     * @param {Number} y1 - Y-axis element of the left-hand side vector of operator.
     * @param {Number} z1 - Z-axis element of the left-hand side vector of operator.
     * @param {Number} x2 - X-axis element of the right-hand side vector of operator.
     * @param {Number} y2 - Y-axis element of the right-hand side vector of operator.
     * @param {Number} z2 - Z-axis element of the right-hand side vector of operator.
     * @returns {Number} The inner product value of the vectors.
     */
    ns.Vector3.dot = function (x1, y1, z1, x2, y2, z2) {
        return x1 * x2 + y1 * y2 + z1 * z2;
    };

    /**
     * Calculate dot value.
     *
     * @memberof xpl.Vector3
     * @function dotv
     * @param {Array.<Number>} v1 - The left-hand side vector of operator.
     * @param {Number} v1_off - Starting position in the left-hand side vector of operator.
     * @param {Array.<Number>} v2 - The right-hand side vector of operator.
     * @param {Number} v2_off - Starting position in the right-hand side vector of operator.
     * @returns {Number} The inner product value of the vectors.
     */
    ns.Vector3.dotv = function (v1, v1_off, v2, v2_off) {
        return v1[v1_off + VX] * v2[v2_off + VX] + v1[v1_off + VY] * v2[v2_off + VY] + v1[v1_off + VZ] * v2[v2_off + VZ];
    };

    /**
     * Calculate cross value then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function cross
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Number} x1 - X-axis element of the left-hand side vector of operator.
     * @param {Number} y1 - Y-axis element of the left-hand side vector of operator.
     * @param {Number} z1 - Z-axis element of the left-hand side vector of operator.
     * @param {Number} x2 - X-axis element of the right-hand side vector of operator.
     * @param {Number} y2 - Y-axis element of the right-hand side vector of operator.
     * @param {Number} z2 - Z-axis element of the right-hand side vector of operator.
     */
    ns.Vector3.cross = function (d, d_off, x1, y1, z1, x2, y2, z2) {
        ns.Vector3.load(d, d_off, y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2);
    };

    /**
     * Calculate cross value then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function crossv
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Array.<Number>} v1 - The left-hand side vector of operator.
     * @param {Number} v1_off - Starting position in the left-hand side vector of operator.
     * @param {Array.<Number>} v2 - The right-hand side vector of operator.
     * @param {Number} v2_off - Starting position in the right-hand side vector of operator.
     */
    ns.Vector3.crossv = function (d, d_off, v1, v1_off, v2, v2_off) {
        ns.Vector3.cross(
            d, d_off,
            v1[v1_off + VX], v1[v1_off + VY], v1[v1_off + VZ],
            v2[v2_off + VX], v2[v2_off + VY], v2[v2_off + VZ]);
    };

    /**
     * Calculate cosine value between two vectors.
     *
     * @memberof xpl.Vector3
     * @function cos
     * @param {Number} x1 - X-axis element of the left-hand side vector of operator.
     * @param {Number} y1 - Y-axis element of the left-hand side vector of operator.
     * @param {Number} z1 - Z-axis element of the left-hand side vector of operator.
     * @param {Number} x2 - X-axis element of the right-hand side vector of operator.
     * @param {Number} y2 - Y-axis element of the right-hand side vector of operator.
     * @param {Number} z2 - Z-axis element of the right-hand side vector of operator.
     * @returns {Number} The cosine between specified two vectors.
     */
    ns.Vector3.cos = function (x1, y1, z1, x2, y2, z2) {
        // normalize a start point vector.
        let len1 = x1 * x1 + y1 * y1 + z1 * z1;
        if (0 < len1) {
            len1 = Math.sqrt(len1);
            x1 /= len1;
            y1 /= len1;
            z1 /= len1;
        }

        // normalize a end point vector.
        let len2 = x2 * x2 + y2 * y2 + z2 * z2;
        if (0 < len2) {
            len2 = Math.sqrt(len2);
            x2 /= len2;
            y2 /= len2;
            z2 /= len2;
        }

        // calculate cosine value from two vectors.
        return x1 * x2 + y1 * y2 + z1 * z2;
    };

    /**
     * Calculate cosine value between two vectors.
     *
     * @memberof xpl.Vector3
     * @function cosv
     * @param {Array.<Number>} v1 - The left-hand side vector of operator.
     * @param {Number} v1_off - Starting position in the left-hand side vector of operator.
     * @param {Array.<Number>} v2 - The right-hand side vector of operator.
     * @param {Number} v2_off - Starting position in the right-hand side vector of operator.
     * @returns {Number} The cosine between specified two vectors.
     */
    ns.Vector3.cosv = function (v1, v1_off, v2, v2_off) {
        return ns.Vector3.cos(
            v1[v1_off + VX], v1[v1_off + VY], v1[v1_off + VZ],
            v2[v2_off + VX], v2[v2_off + VY], v2[v2_off + VZ]);
    };

    /**
     * Calculate cross value then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function reversev
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Array.<Number>} v - The target vector.
     * @param {Number} v_off - Starting position in the target vector.
     */
    ns.Vector3.reversev = function (d, d_off, v, v_off) {
        ns.Vector3.load(d, d_off, -v[v_off + VX], -v[v_off + VY], -v[v_off + VZ]);
    };

    /**
     * Calculate addition any two the vector then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function add
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Number} x1 - X-axis element of the left-hand side vector of operator.
     * @param {Number} y1 - Y-axis element of the left-hand side vector of operator.
     * @param {Number} z1 - Z-axis element of the left-hand side vector of operator.
     * @param {Number} x2 - X-axis element of the right-hand side vector of operator.
     * @param {Number} y2 - Y-axis element of the right-hand side vector of operator.
     * @param {Number} z2 - Z-axis element of the right-hand side vector of operator.
     */
    ns.Vector3.add = function (d, d_off, x1, y1, z1, x2, y2, z2) {
        ns.Vector3.load(d, d_off, x1 + x2, y1 + y2, z1 + z2);
    };

    /**
     * Calculate addition any two the vector then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function addv
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Array.<Number>} v1 - The left-hand side vector of operator.
     * @param {Number} v1_off - Starting position in the left-hand side vector of operator.
     * @param {Array.<Number>} v2 - The right-hand side vector of operator.
     * @param {Number} v2_off - Starting position in the right-hand side vector of operator.
     */
    ns.Vector3.addv = function (d, d_off, v1, v1_off, v2, v2_off) {
        ns.Vector3.add(
            d, d_off,
            v1[v1_off + VX], v1[v1_off + VY], v1[v1_off + VZ],
            v2[v2_off + VX], v2[v2_off + VY], v2[v2_off + VZ]);
    };

    /**
     * Calculate subtraction any two the vector then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function sub
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Number} x1 - X-axis element of the left-hand side vector of operator.
     * @param {Number} y1 - Y-axis element of the left-hand side vector of operator.
     * @param {Number} z1 - Z-axis element of the left-hand side vector of operator.
     * @param {Number} x2 - X-axis element of the right-hand side vector of operator.
     * @param {Number} y2 - Y-axis element of the right-hand side vector of operator.
     * @param {Number} z2 - Z-axis element of the right-hand side vector of operator.
     */
    ns.Vector3.sub = function (d, d_off, x1, y1, z1, x2, y2, z2) {
        ns.Vector3.load(d, d_off, x1 - x2, y1 - y2, z1 - z2);
    };

    /**
     * Calculate subtraction any two the vector then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function subv
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Array.<Number>} v1 - The left-hand side vector of operator.
     * @param {Number} v1_off - Starting position in the left-hand side vector of operator.
     * @param {Array.<Number>} v2 - The right-hand side vector of operator.
     * @param {Number} v2_off - Starting position in the right-hand side vector of operator.
     */
    ns.Vector3.subv = function (d, d_off, v1, v1_off, v2, v2_off) {
        ns.Vector3.sub(
            d, d_off,
            v1[v1_off + VX], v1[v1_off + VY], v1[v1_off + VZ],
            v2[v2_off + VX], v2[v2_off + VY], v2[v2_off + VZ]);
    };

    /**
     * Calculate multiplication any one vector and one scalar value then a the destination vector.
     *
     * @memberof xpl.Vector3
     * @function mul
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Number} x - X element of the target vector.
     * @param {Number} y - Y element of the target vector.
     * @param {Number} z - Z element of the target vector.
     * @param {Number} s - The target scalar.
     */
    ns.Vector3.mul = function (d, d_off, x, y, z, s) {
        ns.Vector3.load(d, d_off, x * s, y * s, z * s);
    };

    /**
     * Calculate multiplication any one vector and one scalar value then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function mulv
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Array.<Number>} v - The target vector.
     * @param {Number} v_off - Starting position in the target vector.
     * @param {Number} s - The target scalar.
     */
    ns.Vector3.mulv = function (d, d_off, v, v_off, s) {
        ns.Vector3.mul(d, d_off, v[v_off + VX], v[v_off + VY], v[v_off + VZ], s);
    };

    /**
     * Calculate multiplication any one vector and one quaternion then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function mulQuaternionv
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Array.<Number>} q - The target quaternion.
     * @param {Number} q_off - Starting position in the target quaternion.
     * @param {Array.<Number>} v - The target vector.
     * @param {Number} v_off - Starting position in the target vector.
     */
    ns.Vector3.mulQuaternionv = function (d, d_off, q, q_off, v, v_off) {
        let rp = q[q_off + CR];
        let ip = q[q_off + CI];
        let jp = q[q_off + CJ];
        let kp = q[q_off + CK];
        let x = v[v_off + VX];
        let y = v[v_off + VY];
        let z = v[v_off + VZ];

        // q * (0 + xi + yj + zk)
        let rp1 = /*rp * 0*/ -(ip * x + jp * y + kp * z);
        let ip1 = rp * x /*+  ip * 0*/ + (jp * z - kp * y);
        let jp1 = rp * y /*+  jp * 0*/ + (kp * x - ip * z);
        let kp1 = rp * z /*+  kp * 0*/ + (ip * y - jp * x);

        // q * (0 + xi + yj + zk) * q→
        // let rp2 =  rp1 * rp + (ip1 * ip +  jp1 * j1 + kp1 * kp);
        ns.Vector3.load(
            d, d_off,
            -rp1 * ip + ip1 * rp - (jp1 * kp - kp1 * jp),
            -rp1 * jp + jp1 * rp - (kp1 * ip - ip1 * kp),
            -rp1 * kp + kp1 * rp - (ip1 * jp - jp1 * ip));
    };

    /**
     * Calculate multiplication any one vector and one matrix then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function mulMatrix4x4v
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Array.<Number>} a1 -
     *              The left-hand side value of operator.
     *              This argument is the matrix if specified true in the argument of column,
     *              this argument is the vector if specified false in the argument of column.
     * @param {Number} a1_off - Starting position in the first elements.
     * @param {Array.<Number>} a2 -
     *              The right-hand side value of operator.
     *              This argument is the vector if specified true in the argument of column,
     *              this argument is the matrix if specified false in the argument of column.
     * @param {Number} a2_off - Starting position in the second elements.
     * @param {Boolean} [column=true] -
     */
    ns.Vector3.mulMatrix4x4v = function (d, d_off, a1, a1_off, a2, a2_off, column) {
        if (column == null) {
            column = true;
        }
        if (column) {
            // calculate as the column vector.
            let x = a2[a2_off + VX];
            let y = a2[a2_off + VY];
            let z = a2[a2_off + VZ];
            let w = a1[a1_off + M30] * x + a1[a1_off + M31] * y + a1[a1_off + M32] * z + a1[a1_off + M33];
            ns.Vector3.load(
                d, d_off,
                (a1[a1_off + M00] * x + a1[a1_off + M01] * y + a1[a1_off + M02] * z + a1[a1_off + M03]) / w,
                (a1[a1_off + M10] * x + a1[a1_off + M11] * y + a1[a1_off + M12] * z + a1[a1_off + M13]) / w,
                (a1[a1_off + M20] * x + a1[a1_off + M21] * y + a1[a1_off + M22] * z + a1[a1_off + M23]) / w);
        } else {
            // calculate as the row vector.
            let x = a1[a1_off + VX];
            let y = a1[a1_off + VY];
            let z = a1[a1_off + VZ];
            let w = x * a2[a2_off + M03] + y * a2[a2_off + M13] + z * a2[a2_off + M23] + a2[a2_off + M33];
            ns.Vector3.load(
                d, d_off,
                (x * a2[a2_off + M00] + y * a2[a2_off + M10] + z * a2[a2_off + M20] + a2[a2_off + M30]) / w,
                (x * a2[a2_off + M01] + y * a2[a2_off + M11] + z * a2[a2_off + M21] + a2[a2_off + M31]) / w,
                (x * a2[a2_off + M02] + y * a2[a2_off + M12] + z * a2[a2_off + M22] + a2[a2_off + M32]) / w);
        }
    };

    /**
     * Calculate multiplication any one vector and one matrix with only axis part then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function mulMatrix4x4Axisv
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Array.<Number>} a1 -
     *              The left-hand side value of operator.
     *              This argument is the matrix if specified true in the argument of column,
     *              this argument is the vector if specified false in the argument of column.
     * @param {Number} a1_off - Starting position in the first elements.
     * @param {Array.<Number>} a2 -
     *              The right-hand side value of operator.
     *              This argument is the vector if specified true in the argument of column,
     *              this argument is the matrix if specified false in the argument of column.
     * @param {Number} a2_off - Starting position in the second elements.
     * @param {Boolean} [column=true] -
     */
    ns.Vector3.mulMatrix4x4Axisv = function (d, d_off, a1, a1_off, a2, a2_off, column) {
        if (column == null) {
            column = true;
        }
        if (column) {
            // calculate as the column vector.
            let x = a2[a2_off + VX];
            let y = a2[a2_off + VY];
            let z = a2[a2_off + VZ];
            ns.Vector3.load(
                d, d_off,
                a1[a1_off + M00] * x + a1[a1_off + M01] * y + a1[a1_off + M02] * z,
                a1[a1_off + M10] * x + a1[a1_off + M11] * y + a1[a1_off + M12] * z,
                a1[a1_off + M20] * x + a1[a1_off + M21] * y + a1[a1_off + M22] * z);
        } else {
            // calculate as the row vector.
            let x = a1[a1_off + VX];
            let y = a1[a1_off + VY];
            let z = a1[a1_off + VZ];
            ns.Vector3.load(
                d, d_off,
                x * a2[a2_off + M00] + y * a2[a2_off + M10] + z * a2[a2_off + M20],
                x * a2[a2_off + M01] + y * a2[a2_off + M11] + z * a2[a2_off + M21],
                x * a2[a2_off + M02] + y * a2[a2_off + M12] + z * a2[a2_off + M22]);
        }
    };

    /**
     * Calculate division any one vector and one scalar value then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function div
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} off - Starting position in the destination vector.
     * @param {Number} x - X element of the vector.
     * @param {Number} y - Y element of the vector.
     * @param {Number} z - Z element of the vector.
     * @param {Number} s - The target scalar.
     */
    ns.Vector3.div = function (d, off, x, y, z, s) {
        ns.Vector3.load(d, off, x * s, y * s, z * s);
    };

    /**
     * Calculate division any one vector and one scalar value then set a destination vector.
     *
     * @memberof xpl.Vector3
     * @function divv
     * @param {Array.<Number>} d - The destination vector.
     * @param {Number} d_off - Starting position in the destination vector.
     * @param {Array.<Number>} v - The target vector.
     * @param {Number} v_off - Starting position in the target vector.
     * @param {Number} s - The target scalar.
     */
    ns.Vector3.divv = function (d, d_off, v, v_off, s) {
        ns.Vector3.div(d, d_off, v[v_off + VX], v[v_off + VY], v[v_off + VZ], s);
    };

    /**
     * Convert to string.
     *
     * @memberof xpl.Vector3
     * @function convertToString
     * @param {Array.<Number>} v - The target vector.
     * @param {Number=0} off - Starting position in the target vector.
     * @returns {String} The converted vector to string.
     */
    ns.Vector3.convertToString = function (v, off) {
        return "Vector3(" + v[off + VX] + ", " + v[off + VY] + ", " + v[off + VZ] + ")";
    };

})(xpl);
