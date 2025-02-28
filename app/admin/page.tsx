"use client";

import { useState, useEffect, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminSidebar from "@/components/admin-sidebar";
import LeadTable from "@/components/lead-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Mock data for leads
const mockLeads = [
  {
    id: 1,
    firstName: "Jorge",
    lastName: "Ruiz",
    email: "jorge@example.com",
    country: "Mexico",
    status: "PENDING",
    submittedAt: "02/02/2024, 2:45 PM",
    visas: ["O-1"],
    linkedIn: "https://linkedin.com/in/jorge",
    additionalInfo: "Looking for options",
  },
  {
    id: 2,
    firstName: "Bahar",
    lastName: "Zamir",
    email: "bahar@example.com",
    country: "Mexico",
    status: "PENDING",
    submittedAt: "02/02/2024, 2:45 PM",
    visas: ["EB-1A"],
    linkedIn: "https://linkedin.com/in/bahar",
    additionalInfo: "Current F-1 visa",
  },
  {
    id: 3,
    firstName: "Mary",
    lastName: "Lopez",
    email: "mary@example.com",
    country: "Brazil",
    status: "PENDING",
    submittedAt: "02/02/2024, 2:45 PM",
    visas: ["EB-2 NIW"],
    linkedIn: "https://linkedin.com/in/mary",
    additionalInfo: "PhD in Computer Science",
  },
  {
    id: 4,
    firstName: "Li",
    lastName: "Zijin",
    email: "li@example.com",
    country: "South Korea",
    status: "PENDING",
    submittedAt: "02/02/2024, 2:45 PM",
    visas: ["O-1", "EB-1A"],
    linkedIn: "https://linkedin.com/in/li",
    additionalInfo: "Award-winning researcher",
  },
  {
    id: 5,
    firstName: "Mark",
    lastName: "Antonov",
    email: "mark@example.com",
    country: "Russia",
    status: "PENDING",
    submittedAt: "02/02/2024, 2:45 PM",
    visas: ["EB-2 NIW"],
    linkedIn: "https://linkedin.com/in/mark",
    additionalInfo: "Software engineer with 10 years experience",
  },
  {
    id: 6,
    firstName: "Jane",
    lastName: "Ma",
    email: "jane@example.com",
    country: "Mexico",
    status: "PENDING",
    submittedAt: "02/02/2024, 2:45 PM",
    visas: ["I don't know"],
    linkedIn: "https://linkedin.com/in/jane",
    additionalInfo: "Looking for options after graduation",
  },
  {
    id: 7,
    firstName: "Anand",
    lastName: "Jain",
    email: "anand@example.com",
    country: "Mexico",
    status: "REACHED_OUT",
    submittedAt: "02/02/2024, 2:45 PM",
    visas: ["O-1"],
    linkedIn: "https://linkedin.com/in/anand",
    additionalInfo: "Entrepreneur with multiple startups",
  },
  {
    id: 8,
    firstName: "Anna",
    lastName: "Voronova",
    email: "anna@example.com",
    country: "France",
    status: "PENDING",
    submittedAt: "02/02/2024, 2:45 PM",
    visas: ["EB-1A"],
    linkedIn: "https://linkedin.com/in/anna",
    additionalInfo: "Researcher in AI",
  },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState(mockLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  // Check if user is already authenticated (in a real app, this would check a token)
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch leads from API
  const fetchLeads = async () => {
    try {
      const response = await fetch(
        `/api/leads${statusFilter ? `?status=${statusFilter}` : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }
      const data = await response.json();
      setLeads(data ?? mockLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Error",
        description: "Failed to fetch leads data",
        variant: "destructive",
      });
    }
  };

  // Fetch leads on mount and when status filter changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated, statusFilter]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple mock authentication
    if (email === "admin@alma.ai" && password === "password") {
      localStorage.setItem("adminToken", "mock-token");
      setIsAuthenticated(true);
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  const updateLeadStatus = (leadId: number, newStatus: string) => {
    setLeads(
      leads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );

    toast({
      title: "Status Updated",
      description: `Lead status has been updated to ${newStatus}`,
    });
  };

  const normalizedStatusFilter = statusFilter === "ALL" ? "" : statusFilter;

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      searchTerm === "" ||
      `${lead.firstName} ${lead.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.country.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      normalizedStatusFilter === "" || lead.status === normalizedStatusFilter;

    setTimeout(() => {
      if (matchesStatus && searchTerm.length > 0) {
        setCurrentPage(1);
      }
    }, 1000);

    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          {/* <div className="mt-4 text-sm text-center text-gray-500">
            <p>Demo credentials:</p>
            <p>Email: admin@alma.ai</p>
            <p>Password: password</p>
          </div> */}
        </div>
      </div>
    );
  }

  const handleChangeStatus = (st: SetStateAction<string>) => {
    setCurrentPage(1);
    setStatusFilter(st);
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1 p-8 bg-white">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Leads</h1>
        </div>

        <div className="flex gap-4 mb-6 w-2/3 justify-left md:w-1/3 sm:w-full">
          <div className="relative w-2/3">
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full text-[#000]"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>

          <div className="w-1/3">
            <Select
              value={statusFilter}
              onValueChange={(st) => handleChangeStatus(st)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="REACHED_OUT">Reached Out</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <LeadTable
          leads={filteredLeads}
          updateLeadStatus={updateLeadStatus}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
