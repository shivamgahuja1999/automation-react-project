const trivyService = require("../services/trivyService");

// Fetch all vulnerabilities (mocked for now)
const getVulnerabilities = async (req, res) => {
    try {
        const vulnerabilities = await trivyService.mockMultipleVulnerabilities;
        res.status(200).json(vulnerabilities);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vulnerabilities", error: error.message });
    }
};

// Fetch a single vulnerability by ID
const getVulnerabilityById = async (req, res) => {
    try {
        const { id } = req.params;
        const vulnerability = trivyService.mockMultipleVulnerabilities.find(vuln => vuln.id === id);

        if (!vulnerability) {
            return res.status(404).json({ message: "Vulnerability not found" });
        }

        res.status(200).json(vulnerability);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vulnerability", error: error.message });
    }
};

// Get statistics for vulnerabilities
const getVulnerabilityStats = async (req, res) => {
    try {
        const stats = trivyService.generateVulnerabilityStats(trivyService.mockMultipleVulnerabilities);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vulnerability statistics", error: error.message });
    }
};

// Get vulnerabilities grouped by severity
const getVulnerabilitiesBySeverity = async (req, res) => {
    try {
        const groupedVulnerabilities = trivyService.groupVulnerabilities(trivyService.mockMultipleVulnerabilities);
        res.status(200).json(groupedVulnerabilities);
    } catch (error) {
        res.status(500).json({ message: "Error fetching grouped vulnerabilities", error: error.message });
    }
};

// Sort vulnerabilities by severity and CVSS score
const getSortedVulnerabilities = async (req, res) => {
    try {
        const sortedVulnerabilities = trivyService.sortVulnerabilities(trivyService.mockMultipleVulnerabilities);
        res.status(200).json(sortedVulnerabilities);
    } catch (error) {
        res.status(500).json({ message: "Error sorting vulnerabilities", error: error.message });
    }
};

module.exports = {
    getVulnerabilities,
    getVulnerabilityById,
    getVulnerabilityStats,
    getVulnerabilitiesBySeverity,
    getSortedVulnerabilities
};
