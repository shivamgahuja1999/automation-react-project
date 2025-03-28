import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { AlertCircle, AlertTriangle, Bug, Shield } from "lucide-react";
import {processZapAlerts, groupAlertsBySeverity} from "../../../backend/services/owaspZapService";

// This is the component itself - unchanged
const OwaspZapCard = ({ scanResults }) => {
  // Component logic remains the same
  const [expandedAlert, setExpandedAlert] = useState(null);

  const defaultData = {
    scanId: "N/A",
    timestamp: new Date().toISOString(),
    alerts: [],
    summary: {
      high: 0,
      medium: 0,
      low: 0,
      informational: 0,
    },
  };

  const data = scanResults || defaultData;
  const processedAlerts = processZapAlerts(data.alerts);
  const groupedAlerts = groupAlertsBySeverity(processedAlerts);

  const getSeverityIcon = (risk) => {
    switch (risk.toLowerCase()) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "low":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bug className="h-5 w-5 text-blue-500" />;
    }
  };

  const getSeverityColor = (risk) => {
    const colors = {
      high: "text-red-500",
      medium: "text-orange-500",
      low: "text-yellow-500",
      informational: "text-blue-500",
    };
    return colors[risk.toLowerCase()] || "text-gray-500";
  };

  return (
    <Card className="col-span-3 w-full shadow-lg">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <CardTitle>OWASP ZAP Scan Results</CardTitle>
          </div>
          <div className="text-sm text-gray-500">
            Scan ID: {data.scanId}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {/* Summary Section */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {Object.entries(data.summary).map(([severity, count]) => (
            <div key={severity} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className={`font-bold uppercase ${getSeverityColor(severity)} mb-2`}>
                {severity}
              </p>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-sm text-gray-500">Alerts</p>
            </div>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {data.alerts.map((alert, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setExpandedAlert(expandedAlert === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getSeverityIcon(alert.risk)}
                  <h3 className="font-medium">{alert.name}</h3>
                </div>
                <p className={`font-bold ${getSeverityColor(alert.risk)}`}>
                  {alert.risk}
                </p>
              </div>

              {expandedAlert === index && (
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Description:</p>
                    <p className="text-gray-600">{alert.description}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Solution:</p>
                    <p className="text-gray-600">{alert.solution}</p>
                  </div>
                  {alert.instances && (
                    <div>
                      <p className="font-medium text-gray-700">Affected URLs:</p>
                      <ul className="list-disc list-inside">
                        {alert.instances.map((instance, i) => (
                          <li key={i} className="text-blue-600 truncate">
                            {instance.url}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {alert.references && (
                    <div>
                      <p className="font-medium text-gray-700">References:</p>
                      <ul className="list-disc list-inside">
                        {alert.references.map((ref, i) => (
                          <li key={i} className="text-blue-600 truncate">
                            {ref}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OwaspZapCard;

// Example of how this component should be rendered in the parent container
/*
// In your parent component, instead of:
<div className="grid grid-cols-3 gap-4">
  <OwaspZapCard scanResults={data} />
  <div></div>  // Empty grid cell
  <div></div>  // Empty grid cell
</div>

// Use this instead:
<div className="w-full">
  <OwaspZapCard scanResults={data} />
</div>
*/