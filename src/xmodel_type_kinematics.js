/**
 * @license
 *
 * Copyright (c) 2016, Syuuhei Kuno
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of xplain_for_js nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function (ns) {

    "use strict";

    /**
     * 逆運動学構造です。
     *
     * @class
     * @alias xpl.XModelIK
     * @augments xpl.XModelStructure
     */
    ns.XModelIK = function () {
        ns.XModelStructure.call(this, ns.XModelStructure.TYPE_IK);

        /**
         * XModelNode : 対象のノード
         *
         * @instance
         * @memberof xpl.XModelIK
         * @member {xpl.XModelNode} target
         */
        this.target = null;

        /**
         * uint16_t : 繰り返しの最大数
         *
         * @instance
         * @memberof xpl.XModelIK
         * @member {xpl.uint16_t} max_iterations
         */
        this.max_iterations = 500;

        /**
         * uint16_t : チェインの数
         *
         * @instance
         * @memberof xpl.XModelIK
         * @member {xpl.uint16_t} chain_length
         */
        this.chain_length = 1;

        /**
         * float32_t : 影響度
         *
         * @instance
         * @memberof xpl.XModelIK
         * @member {xpl.float32_t} influence
         */
        this.influence = 1.0;
    };

    Object.setPrototypeOf(ns.XModelIK.prototype, ns.XModelStructure.prototype);

})(xpl);
