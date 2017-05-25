<%--
    /*
    * Copyright (C) 2005-2014 Rivet Logic Corporation.
    *
    * This program is free software; you can redistribute it and/or
    * modify it under the terms of the GNU General Public License
    * as published by the Free Software Foundation; version 3
    * of the License.
    *
    * This program is distributed in the hope that it will be useful,
    * but WITHOUT ANY WARRANTY; without even the implied warranty of
    * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    * GNU General Public License for more details.
    *
    * You should have received a copy of the GNU General Public License
    * along with this program; if not, write to the Free Software
    * Foundation, Inc., 51 Franklin Street, Fifth Floor,
    * Boston, MA 02110-1301, USA.
    */
--%>
<%@ include file="/init.jsp" %>
<div class="calculator-portlet">
	<input class="calculator-display" type="text" value="0" readonly="readonly"/>
	<div class="calculator-buttons clearfix">
		<div class="calculator-numbers">
			<div class="memory-btns">
				<button class="calculator-memory btn memoryPlus"><liferay-ui:message key="code.memory.plus"/></button> 
				<button class="calculator-memory btn memoryMinus"><liferay-ui:message key="code.memory.minus"/></button> 
				<button class="calculator-memory btn memoryClear"><liferay-ui:message key="code.memory.clear"/></button> 
				<button class="calculator-memory btn memoryRecall"><liferay-ui:message key="code.memory.recall"/></button> 
			</div>
			<div>
				<button class="btn btn-primary processNumber">7</button>
				<button class="btn btn-primary processNumber">8</button> 
				<button class="btn btn-primary processNumber">9</button>
			</div>
			<div>
			    <button class="btn btn-primary processNumber">4</button> 
			    <button class="btn btn-primary processNumber">5</button> 
			    <button class="btn btn-primary processNumber">6</button> 
		    </div>
			<div>
			    <button class="btn btn-primary processNumber">1</button> 
			    <button class="btn btn-primary processNumber">2</button> 
			    <button class="btn btn-primary processNumber">3</button> 
		    </div>
			<div>
			    <button class="btn btn-primary processNumber">0</button> 
			    <button class="btn btn-primary processDecimal">.</button> 
			    <button class="btn btn-primary reset">c</button> 
		    </div>
	    </div>
		<div class="calculator-operations">
			<button class="op-buttons btn btn-primary">&divide;</button> 
			<button class="op-buttons btn btn-primary">x</button> 
			<button class="op-buttons btn btn-primary">&ndash;</button>
			<button class="op-buttons btn btn-primary">+</button> 
			<button class="equals-operator btn btn-primary">=</button>
		</div>
	</div>
</div>
