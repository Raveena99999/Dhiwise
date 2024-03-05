import React, { useState } from "react";

function Workfloweditor() {
  const [workflow, setWorkflow] = useState([]);
  const [nodeCount, setNodeCount] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [newNodeType, setNewNodeType] = useState("");
  const [editNodeId, setEditNodeId] = useState(null);
  const [workflowName, setWorkflowName] = useState("");
  const [outputData, setOutputData] = useState([]);
  const [showOutputPanel, setShowOutputPanel] = useState(false);
  const [exportFormat, setExportFormat] = useState("");
  const [description, setDescription] = useState("");
  const [editedTitle, setEditedTitle] = useState("");

  

  const createNode = (type) => {
    const newNode = {
      id: nodeCount,
      type: newNodeType || type,
      title: newNodeType || type, // Set title and type to the same value
      description: description, // Add description field
    };
    setWorkflow([...workflow, newNode]);
    setNodeCount(nodeCount + 1);
    setShowInput(false);
    setNewNodeType("");
    setDescription("");
  };
  
  const editNode = (id) => {
    const updatedWorkflow = workflow.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          title: editedTitle || node.title,
          type: editedTitle || node.title // Update both title and type
        };
      }
      return node;
    });
    setWorkflow(updatedWorkflow);
    setEditNodeId(null);
    setEditedTitle(""); // Reset edited title
  };
  





  const handleInputChange = (e) => {
    setNewNodeType(e.target.value);
  };
 
 



  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSaveWorkflow = () => {
    if (workflowName.trim() === "") {
      alert("Please enter a name for the workflow.");
      return;
    }
    // Save workflow to local storage
    const savedWorkflows = JSON.parse(localStorage.getItem("workflows")) || [];
    const newWorkflow = {
      id: Date.now(),
      name: workflowName,
      nodes: workflow,
    };
    localStorage.setItem(
      "workflows",
      JSON.stringify([...savedWorkflows, newWorkflow])
    );
    // Clear current workflow and workflow name
    setWorkflow([]);
    setWorkflowName("");
  };

  const runWorkflow = () => {

 // Update type of all nodes with the latest edited title
 const updatedWorkflow = workflow.map((node) => ({
  ...node,
  type: node.title // Set type to the title
}));
setWorkflow(updatedWorkflow);

    // Simulating data processing
    const newData = workflow.map((node) => ({
      id: node.id,
      type: node.type,
      data: "Sample data for node " + node.id,
    }));
    setOutputData(newData);
    setShowOutputPanel(true);
  };

  const exportData = () => {
    if (exportFormat === "json") {
      // Export data in JSON format
      const jsonData = JSON.stringify(outputData, null, 2);
      // Trigger download
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "workflow_output.json";
      a.click();
    } else if (exportFormat === "csv") {
      // Export data in CSV format
      const csvContent =
        "data:text/csv;charset=utf-8," +
        outputData.map((row) => Object.values(row).join(",")).join("\n");
      // Trigger download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "workflow_output.csv");
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <main>
      <header>
        <h2
          style={{
            textAlign: "center",
            fontSize: "20px",
            marginTop: "2rem",
            color: "white",
          }}
        >
          Workflow Editor
        </h2>
        <div style={{ width: "350px", margin: "auto", marginTop: "2rem" }}>
          <input
            style={{ border: "2px solid black", borderRadius: "10px" }}
            type="text"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            placeholder="Enter workflow name"
          />
          <button
            style={{
              marginLeft: "5px",
              border: "2px solid white",
              borderRadius: "10px",
              padding: "3px",
              color: "white",
            }}
            onClick={handleSaveWorkflow}
          >
            Save Workflow
          </button>
        </div>
      </header>
      <button
        style={{
          fontSize: "20px",
          borderRadius: "25px",
          border: "2px solid white",
          padding: "3px",
          color: "white",
        }}
        onClick={() => setShowInput(true)}
      >
        + Block
      </button>

      {showInput && (
        <div className="node ">
          <form
            className="space-y-6 w-80 m-auto mt-20"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-white"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="title"
                  value={newNodeType}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Description
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="description"
                  name="description"
                  type="text"
                  autoComplete="description"
                  required
                  value={description}
                  onChange={handleDescription}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={() => createNode("Custom")}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Node
              </button>
            </div>
          </form>
        </div>
      )}

      <div
        id="canvas"
        style={{ width: "70%", margin: "auto", marginTop: "2rem" }}
      >
        <div className="nodes grid grid-cols-3 gap-4 shadow-md">
          {workflow.map((node) => (
            <div
              key={node.id}
              className="node border p-4"
              style={{
                overflow: "scroll",
                boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
                border: "7px solid white",
                // color: "white",
                display: "grid",
                borderRadius: "15px",
                height: "25vh",
              }}
            >
              <div>
                <h3  className="text-2xl text-white">Title: {node.title}</h3>
                <p className="text-white">Description: {node.description}</p>
              </div>
              <div>
                {editNodeId === node.id ? (
                  <div>
                    <input
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="title"
                     required
                    //  value={editedTitle}
                      value={editNodeId === node.id ? editedTitle : node.title} 
  onChange={(e) => setEditedTitle(e.target.value)} 
                    />
                    <button
                      onClick={() => editNode(node.id, newNodeType)}
                      style={{ color: "white" }}
                    >
                      Confirm
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => setEditNodeId(node.id)}
                      style={{ color: "white", marginLeft: "25px" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={runWorkflow}
                      style={{ color: "white", marginLeft: "10px" }}
                    >
                      Run
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
         
        </div>

       
        
      </div>
      {showOutputPanel && (
        <div
          style={{ margin: "20px", border: "2px solid white", padding: "10px" }}
        >
          <div>
            <button
              onClick={exportData}
              style={{ marginRight: "10px", color: "white" }}
            >
              Export Data
            </button>
            <select onChange={(e) => setExportFormat(e.target.value)}>
              <option value="">Select format</option>
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
            </select>
          </div>
          <h3 style={{ color: "white" }}>Output Data</h3>

          <table
            style={{
              color: "white",
              width: "100%",
              marginTop: "10px",
              borderCollapse: "collapse",
              border: "1px solid white",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid white" }}>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    borderRight: "1px solid white",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    borderRight: "1px solid white",
                  }}
                >
                  Type
                </th>
                <th style={{ padding: "10px", textAlign: "left" }}>Data</th>
              </tr>
            </thead>
            <tbody>
              {outputData.map((row) => (
                <tr key={row.id} style={{ borderBottom: "1px solid black" }}>
                  <td
                    style={{ padding: "10px", borderRight: "1px solid white" }}
                  >
                    {row.id}
                  </td>
                  <td
                    style={{ padding: "10px", borderRight: "1px solid white" }}
                  >
                    {row.type}
                  </td>
                  <td style={{ padding: "10px" }}>{row.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default Workfloweditor;
